import 'allocator/tlsf'
import * as eth from './ethereum'
import * as debug from './debug'
import { OPCODE } from './opcode'
import { Stack } from './stack'

// Pointer to beginning of calldata on memory
let inputPtr: usize
let pc: u32 = 0
const stack: Stack = new Stack()
// Pointer for storing final result
let resultPtr: usize
// Contract from which to retrieve env data
const ENV_CONTRACT: u8 = 0x10

export function main(): void {
  // Copy calldata to heap
  const length: u32 = eth.getCallDataSize()
  inputPtr = memory.allocate(length)
  eth.callDataCopy(inputPtr, 0, length)

  while (pc < length) {
    const opcode: u8 = load<u8>(inputPtr + pc)
    pc++
    runOpcode(opcode)
  }

  memory.free(inputPtr)
}

export function runOpcode(opcode: u8): void {
  switch (opcode) {
    case OPCODE.STOP: {
      eth.finish(resultPtr, 1)
      memory.free(resultPtr)
      break
    }
    case OPCODE.ADD: {
      const v1 = stack.pop()
      const v2 = stack.pop()
      stack.push(v1 + v2)
      break
    }
    case OPCODE.MUL: {
      stack.push(stack.pop() * stack.pop())
      break
    }
    case OPCODE.SUB: {
      const v1 = stack.pop()
      const v2 = stack.pop()
      stack.push(v1 - v2)
      break
    }
    case OPCODE.DIV: {
      const v1 = stack.pop()
      const v2 = stack.pop()
      if (v2 === 0) unreachable()
      stack.push(v1 / v2)
      break
    }
    case OPCODE.NUMBER: {
      const res: u8 = call(ENV_CONTRACT, 0, 0x43)
      stack.push(res)
      break
    }
    case OPCODE.MLOAD: {
      const offset = stack.pop()
      // FIXME: Should load word, not byte
      const val: u8 = load<u8>(offset)
      stack.push(val)
      break
    }
    case OPCODE.MSTORE8: {
      const offset = stack.pop()
      const b = stack.pop()
      store<u8>(offset, b)
      break
    }
    case OPCODE.SLOAD: {
      let keyPtr = memory.allocate(1)
      let key = stack.pop()
      store<u8>(keyPtr, key)
      let resPtr = memory.allocate(1)
      eth.storageLoad(keyPtr, resPtr)
      let v: u8 = load<u8>(resPtr)
      stack.push(v)
      break
    }
    case OPCODE.PUSH1: {
      const val: u8 = load<u8>(inputPtr + pc)
      pc++
      stack.push(val)
      break
    }
    case OPCODE.CALL: {
      const addressOffset = stack.pop()
      const valueOffset = stack.pop()
      const dataOffset = stack.pop()
      const dataLength = stack.pop()
      const res: u8 = eth.call(addressOffset, valueOffset, dataOffset, dataLength)
      stack.push(res)
      break
    }
    case OPCODE.RETURN: {
      resultPtr = memory.allocate(1)
      store<u8>(resultPtr, stack.pop())
      break
    }
  }
}

function call(address: u8, value: u8, data: u8): u8 {
  const addressPtr = memory.allocate(1)
  const valuePtr = memory.allocate(1)
  const dataPtr = memory.allocate(1)
  const dataLength = 1
  store<u8>(addressPtr, address)
  store<u8>(valuePtr, value)
  store<u8>(dataPtr, data)
  return eth.call(addressPtr, valuePtr, dataPtr, dataLength)
}
