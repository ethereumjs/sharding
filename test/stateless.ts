import test from 'ava'
import Account from 'ethereumjs-account'
import { attachTxWitness, verifyTx } from '../src/stateless'
import State from '../src/state'
import Trie from '../src/trie'
import VM from '../src/vm'
const Tx = require('ethereumjs-tx')

test('Stateless', async t => {
  let tx = createTx()
  const state = new State()

  const fromAddr = tx.from
  const toAddr = Buffer.from(tx.to, 'hex')
  const fromAccount = new Account({ nonce: '0x00', balance: '0xffffffff' })
  const toAccount = new Account({ nonce: '0x05', balance: '0xff' })
  await state.putAccount(fromAddr, fromAccount)
  await state.putAccount(toAddr, toAccount)
  await state.flush()

  tx = { rawTx: tx, accessList: [fromAddr, toAddr] }
  tx = await attachTxWitness(new Trie(state.wrapped._trie), tx)

  const vm = VM.fromState(state)
  const preStateRoot = await state.getStateRoot()
  await vm.runTx(tx.rawTx)
  const postStateRoot = await state.getStateRoot()

  tx = Object.assign({}, tx, { preStateRoot, postStateRoot })

  t.true(await verifyTx(tx))
})

function createTx() {
  const privateKey = Buffer.from(
    'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109',
    'hex',
  )
  const to = '0000000000000000000000000000000000000001'
  const txParams = {
    nonce: '0x00',
    gasPrice: 1,
    gasLimit: 30000,
    to: '0x' + to,
    value: '0x11',
    // data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
    data: '0x00',
    chainId: 3,
  }

  const tx = new Tx(txParams)
  tx.sign(privateKey)
  tx.gas = tx.getUpfrontCost()

  return tx
}
