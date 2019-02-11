const { promisify } = require('util')
const VM = require('ethereumjs-vm')
const Tx = require('ethereumjs-tx')
import Account from 'ethereumjs-account'
const Trie = require('merkle-patricia-tree/secure')
const StateManager = require('ethereumjs-vm/dist/stateManager')
const proof = require('merkle-patricia-tree/proof')
const ethUtil = require('ethereumjs-util')

const verifyProofP = promisify(proof.verifyProof)
const proveP = promisify(proof.prove)

export async function attachTxWitness(trie: any, tx: any) {
  const witnesses = []
  for (const account of tx.accessList) {
    const witness = await proveP(trie, ethUtil.keccak256(account))
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
  const t = new Trie()
  const putRawP = promisify(t.putRaw.bind(t))
  const getP = promisify(t.get.bind(t))
  t.root = preStateRoot
  for (let i = 0; i < accessList.length; i++) {
    const account = accessList[i]
    const witness = witnesses[i]
    let val
    try {
      val = await verifyProofP(preStateRoot, ethUtil.keccak256(account), witness)
    } catch (e) {
      return false
    }

    for (const part of witness) {
      const hash = ethUtil.keccak256(part)
      await putRawP(hash, part)
    }

    // Sanity check: the value was added correctly to trie
    const v = await getP(account)
    if (!v.equals(val)) {
      return false
    }
  }

  // Run transaction with all of accessList accounts in the trie
  // and verify that postStateRoot matches
  const stateManager = new StateManager({ trie: t })
  const vm = new VM({ stateManager })
  const runTxP = promisify(vm.runTx.bind(vm))
  await runTxP({ tx: rawTx })

  if (!t.root.equals(postStateRoot)) {
    return false
  }

  return true
}
