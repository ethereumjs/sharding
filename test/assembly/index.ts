import test from 'ava'
const fs = require('fs')
const path = require('path')
const BN = require('bn.js')
import { Contract } from '../../src/ewasm'
import { OPCODE as OP } from '../../assembly/opcode'
import { default as Interface } from '../../src/ewasm/interface/minimal'
import State from '../../src/state'
import * as testcases from './testcases.json'

const wasm = fs.readFileSync(path.join(__dirname, '../../build/optimized.wasm'))

test('should run valid evm bytecode and return result', t => {
  const state = new State()

  for (const st of testcases.cases) {
    const c = new Contract(wasm)
    const iface = new Interface(
      { data: Buffer.from(st.calldata, 'hex'), blockNumber: testcases.env.blockNumber },
      state,
    )
    const res = c.run(iface)

    t.is(res.exception, st.exception)
    t.deepEqual(res.return, Buffer.from(st.return, 'hex'))
  }
})
