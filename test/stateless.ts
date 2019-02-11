import * as tape from 'tape'
import Account from 'ethereumjs-account'
import { attachTxWitness, verifyTx } from '../src/stateless'
const VM = require('ethereumjs-vm')
const { promisify } = require('util')
const Tx = require('ethereumjs-tx')

tape('Stateless', async (t) => {
  let tx = createTx()
  const vm = new VM()
  const putAccountP = promisify(vm.stateManager.putAccount.bind(vm.stateManager))
  const getStateRootP = promisify(vm.stateManager.getStateRoot.bind(vm.stateManager))
  const runTxP = promisify(vm.runTx.bind(vm))
  const flush = promisify(vm.stateManager._cache.flush.bind(vm.stateManager._cache))

  const a = new Account({ nonce: '0x00', balance: '0xffffffff' })
  await putAccountP(tx.from, a)
  const toAddr = Buffer.from(tx.to, 'hex')
  const toAccount = new Account({ nonce: '0x05', balance: '0xff' })
  await putAccountP(toAddr, toAccount)
  await flush()

  tx = { rawTx: tx, accessList: [tx.from, toAddr] }
  tx = await attachTxWitness(vm.stateManager._trie, tx)

  const preStateRoot = await getStateRootP()
  await runTxP({ tx: tx.rawTx })
  const postStateRoot = await getStateRootP()

  tx = Object.assign({}, tx, { preStateRoot, postStateRoot })

  t.ok(await verifyTx(tx))
  t.end()
})

function createTx() {
  const privateKey = Buffer.from('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')
  const to = '0000000000000000000000000000000000000001'
  const txParams = {
    nonce: '0x00',
    gasPrice: 1,
    gasLimit: 30000,
    to: '0x' + to,
    value: '0x11',
    // data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
    data: '0x00',
    chainId: 3
  }

  const tx = new Tx(txParams)
  tx.sign(privateKey)
  tx.gas = tx.getUpfrontCost()

  return tx
}
