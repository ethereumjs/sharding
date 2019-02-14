import 'allocator/tlsf'
import * as eth from './ethereum'
import * as debug from './debug'
import { OPCODE } from './opcode'
import { Stack } from './stack'

// Contract from which to retrieve env data
const ENV_CONTRACT: u8 = 0x10

// Pointer to beginning of calldata on memory
var inputPtr: usize
// Pointer for storing final result
let resultPtr: usize

var pc: u32 = 0
var stack: Stack = new Stack()

export function main(): void {
  // Copy calldata to heap
  var length: u32 = eth.getCallDataSize()
  inputPtr = memory.allocate(length)
  eth.callDataCopy(inputPtr, 0, length)

  while (pc < length) {
    let opcode: u8 = load<u8>(inputPtr + pc)
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
      let v1 = stack.pop()
      let v2 = stack.pop()
      stack.push(v1 + v2)
      break
    }
    case OPCODE.MUL: {
      stack.push(stack.pop() * stack.pop())
      break
    }
    case OPCODE.SUB: {
      let v1 = stack.pop()
      let v2 = stack.pop()
      stack.push(v1 - v2)
      break
    }
    case OPCODE.DIV: {
      let v1 = stack.pop()
      let v2 = stack.pop()
      if (v2 === 0) unreachable()
      stack.push(v1 / v2)
      break
    }
    case OPCODE.NUMBER: {
      let res: u8 = call(ENV_CONTRACT, 0, 0x43)
      stack.push(res)
      break
    }
    case OPCODE.MLOAD: {
      let offset = stack.pop()
      // FIXME: Should load word, not byte
      let val: u8 = load<u8>(offset)
      stack.push(val)
      break
    }
    case OPCODE.MSTORE8: {
      // How should user determine offset?!
      // Maybe keep pre-specified memory-range free
      let offset = stack.pop()
      let b = stack.pop()
      store<u8>(offset, b)
      break
    }
    case OPCODE.SLOAD: {
      let key = stack.pop()
      let keyPtr = memory.allocate(1)
      let resPtr = memory.allocate(1)
      store<u8>(keyPtr, key)
      eth.storageLoad(keyPtr, resPtr)
      let v: u8 = load<u8>(resPtr)
      stack.push(v)
      break
    }
    case OPCODE.SSTORE: {
      let key = stack.pop()
      let val = stack.pop()
      let keyPtr = memory.allocate(1)
      let valPtr = memory.allocate(1)
      store<u8>(keyPtr, key)
      store<u8>(valPtr, val)
      eth.storageStore(keyPtr, valPtr)
      break
    }
    case OPCODE.PUSH1: {
      let val: u8 = load<u8>(inputPtr + pc)
      pc++
      stack.push(val)
      break
    }
    case OPCODE.CALL: {
      let addressOffset = stack.pop()
      let valueOffset = stack.pop()
      let dataOffset = stack.pop()
      let dataLength = stack.pop()
      let res: u8 = eth.call(addressOffset, valueOffset, dataOffset, dataLength)
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
  let addressPtr = memory.allocate(1)
  let valuePtr = memory.allocate(1)
  let dataPtr = memory.allocate(1)
  let dataLength = 1
  store<u8>(addressPtr, address)
  store<u8>(valuePtr, value)
  store<u8>(dataPtr, data)
  return eth.call(addressPtr, valuePtr, dataPtr, dataLength)
}
