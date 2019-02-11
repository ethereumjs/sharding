/**
 * @module vm
 */
const { promisify } = require('util')
const VM1 = require('ethereumjs-vm')
import State from '../state'
import Trie from '../trie'

export default class VM {
  wrapped: any

  constructor(wrapped: any = new VM()) {
    this.wrapped = wrapped
  }

  static fromState(state: State) {
    const wrapped = new VM1({ stateManager: state.wrapped })
    return new VM(wrapped)
  }

  static fromTrie(trie: Trie) {
    const state = State.fromTrie(trie)
    return VM.fromState(state)
  }

  runTx(tx: any) {
    const p = promisify(this.wrapped.runTx.bind(this.wrapped))
    return p({ tx })
  }
}
