/**
 * @module state
 */
const { promisify } = require('util')
const StateManager = require('ethereumjs-vm/dist/stateManager')
import Account from 'ethereumjs-account'
import Trie from '../trie'

export default class State {
  wrapped: any

  constructor(wrapped: any = new StateManager()) {
    this.wrapped = wrapped
  }

  static fromTrie(trie: Trie) {
    const wrapped = new StateManager({ trie: trie.wrapped })
    return new State(wrapped)
  }

  getAccount(address: Buffer) {
    const p = promisify(this.wrapped.getAccount.bind(this.wrapped))
    return p(address)
  }

  putAccount(address: Buffer, account: Account) {
    const p = promisify(this.wrapped.putAccount.bind(this.wrapped))
    return p(address, account)
  }

  getStateRoot() {
    const p = promisify(this.wrapped.getStateRoot.bind(this.wrapped))
    return p()
  }

  flush() {
    const p = promisify(this.wrapped._cache.flush.bind(this.wrapped._cache))
    return p()
  }
}
