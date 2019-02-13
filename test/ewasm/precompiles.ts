import test from 'ava'
const fs = require('fs')
const path = require('path')
const BN = require('bn.js')
import { Contract } from '../../src/ewasm'
import { default as Interface } from '../../src/ewasm/interface/eei'

test('should run keccak256 and return correct result', t => {
  const keccak256Wasm = fs.readFileSync(
    path.join(__dirname, '../../src/ewasm/precompiles/keccak256.wasm'),
  )

  const callValue = new BN('056bc75e2d63100000', 16)
  const runData = {
    gasLimit: new BN(20000),
    data: Buffer.from('ewasm'),
    value: callValue.toBuffer('be', 16),
  }

  const c = new Contract(keccak256Wasm)
  const iface = new Interface(runData)
  const res = c.run(iface)

  t.is(res.exception, 1)
  t.deepEqual(
    res.return,
    Buffer.from('8526f747691de13f1ecab8ed83200a08d8814ae27238491bf8bc3c232d5f66e6', 'hex'),
  )
})
