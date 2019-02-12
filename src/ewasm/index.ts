/**
 * @module ewasm
 */
const fs = require('fs')
const path = require('path')
import Contract from './contract'

interface Contracts {
  [key: string]: any
}

const contracts: Contracts = {}
const wasmFiles = fs.readdirSync(path.join(__dirname, './precompiles'))
for (const f of wasmFiles) {
  const name = f.replace('.wasm', '')
  const raw = fs.readFileSync(path.join(__dirname, './precompiles', f))
  contracts[name] = new Contract(raw)
}

const precompiles = {
  '0000000000000000000000000000000000000002': contracts['sha256'],
  '0000000000000000000000000000000000000003': contracts['ripemd160'],
  '0000000000000000000000000000000000000004': contracts['identity'],
  '0000000000000000000000000000000000000006': contracts['ecadd'],
  '0000000000000000000000000000000000000007': contracts['ecmul'],
  '0000000000000000000000000000000000000008': contracts['ecpairing'],
}

export { Contract, precompiles }
