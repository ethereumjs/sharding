import test from 'ava'
const fs = require('fs')
const path = require('path')
const BN = require('bn.js')
import { Contract } from '../../src/ewasm'
import { OPCODE as OP } from '../../assembly/opcode'
import { default as Interface } from '../../src/ewasm/interface/minimal'

const wasm = fs.readFileSync(path.join(__dirname, '../../build/optimized.wasm'))

test('should parse stop', t => {
  const c = new Contract(wasm)
  const bytecode = Buffer.from([OP.STOP])
  const iface = new Interface({ init: bytecode })
  const res = c.run(iface)
  t.is(res.exception, 1)
})

test('should perform arithmetic', t => {
  const cases = [
    {
      init: Buffer.from([OP.PUSH1, 0x07, OP.PUSH1, 0x03, OP.ADD, OP.RETURN, OP.STOP]),
      return: Buffer.from([10]),
    },
    {
      init: Buffer.from([
        OP.PUSH1,
        0x91,
        OP.PUSH1,
        0xa1,
        OP.SUB,
        OP.PUSH1,
        0x31,
        OP.ADD,
        OP.RETURN,
        OP.STOP,
      ]),
      return: Buffer.from([0xa1 - 0x91 + 0x31]),
    },
  ]

  for (const st of cases) {
    const c = new Contract(wasm)
    const iface = new Interface({ init: st.init })
    const res = c.run(iface)

    t.is(res.exception, 1)
    t.deepEqual(res.return, st.return)
  }
})

test('should store/load memory', t => {
  const c = new Contract(wasm)
  const offset = 0x0f
  const val = 0xab
  const bytecode = Buffer.from([
    OP.PUSH1,
    val,
    OP.PUSH1,
    offset,
    OP.MSTORE8,
    OP.PUSH1,
    offset,
    OP.MLOAD,
    OP.RETURN,
    OP.STOP,
  ])
  const iface = new Interface({ init: bytecode })
  const res = c.run(iface)
  t.is(res.exception, 1)
  t.deepEqual(res.return, Buffer.from([val]))
})

test('should get block number via call', t => {
  const c = new Contract(wasm)
  const blockNumber = 0x05
  const address = 0x10
  const addressOffset = 0xf0
  const value = 0x00
  const valueOffset = 0xf1
  const data = OP.NUMBER
  const dataOffset = 0xf2
  const dataLength = 0x01
  const bytecode = Buffer.from([
    OP.PUSH1,
    data,
    OP.PUSH1,
    dataOffset,
    OP.MSTORE8,
    OP.PUSH1,
    value,
    OP.PUSH1,
    valueOffset,
    OP.MSTORE8,
    OP.PUSH1,
    address,
    OP.PUSH1,
    addressOffset,
    OP.MSTORE8,
    OP.PUSH1,
    dataLength,
    OP.PUSH1,
    dataOffset,
    OP.PUSH1,
    valueOffset,
    OP.PUSH1,
    addressOffset,
    OP.CALL,
    OP.RETURN,
    OP.STOP,
  ])
  const iface = new Interface({ init: bytecode, blockNumber })
  const res = c.run(iface)
  t.is(res.exception, 1)
  t.deepEqual(res.return, Buffer.from([blockNumber]))
})
