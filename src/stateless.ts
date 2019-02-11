const { promisify } = require('util')
const VM = require('ethereumjs-vm')
const StateManager = require('ethereumjs-vm/dist/stateManager')
const ethUtil = require('ethereumjs-util')
import Trie from './trie'

export async function attachTxWitness(trie: any, tx: any) {
  const witnesses = []
  for (const account of tx.accessList) {
    const witness = await Trie.prove(trie, account)
    witnesses.push(witness)
  }

  const newTx = Object.assign({}, tx, { witnesses })
  return newTx
}

export async function verifyTx(tx: any) {
  const { rawTx, preStateRoot, postStateRoot, accessList, witnesses } = tx
  if (accessList.length !== witnesses.length) {
    throw new Error('Tx witnesses do\'nt match the access list')
  }

  // Verify witnesses and add the leaves they prove
  // to a fresh trie, which will later be used to run
  // the transaction on
  const trie = new Trie()
  trie.wrapped.root = preStateRoot
  for (let i = 0; i < accessList.length; i++) {
    const account = accessList[i]
    const witness = witnesses[i]
    let val
    try {
      val = await Trie.verifyProof(preStateRoot, account, witness)
    } catch (e) {
      return false
    }

    for (const part of witness) {
      const hash = ethUtil.keccak256(part)
      await trie.putRaw(hash, part)
    }

    // Sanity check: the value was added correctly to trie
    const v = await trie.get(account)
    if (!v.equals(val)) {
      return false
    }
  }

  // Run transaction with all of accessList accounts in the trie
  // and verify that postStateRoot matches
  const stateManager = new StateManager({ trie: trie.wrapped })
  const vm = new VM({ stateManager })
  const runTxP = promisify(vm.runTx.bind(vm))
  await runTxP({ tx: rawTx })

  if (!trie.wrapped.root.equals(postStateRoot)) {
    return false
  }

  return true
}
