const { promisify } = require('util')
const ethUtil = require('ethereumjs-util')
const MPT = require('merkle-patricia-tree/secure')
const { prove, verifyProof } = require('merkle-patricia-tree/proof')

export default class Trie {
  wrapped: any

  constructor(wrapped: any = new MPT()) {
    this.wrapped = wrapped
  }

  static prove(trie: any, key: Buffer) {
    // TODO: remove hashing when [#79](https://github.com/ethereumjs/merkle-patricia-tree/pull/79)
    // is released.
    const hash = ethUtil.keccak256(key)
    const p = promisify(prove)
    return p(trie, hash)
  }

  static verifyProof(rootHash: Buffer, key: Buffer, proof: any) {
    const hash = ethUtil.keccak256(key)
    const p = promisify(verifyProof)
    return p(rootHash, hash, proof)
  }

  get(key: Buffer) {
    const p = promisify(this.wrapped.get.bind(this.wrapped))
    return p(key)
  }

  put(key: Buffer, value: Buffer) {
    const p = promisify(this.wrapped.put.bind(this.wrapped))
    return p(key, value)
  }

  putRaw(key: Buffer, value: Buffer) {
    const p = promisify(this.wrapped.putRaw.bind(this.wrapped))
    return p(key, value)
  }
}
