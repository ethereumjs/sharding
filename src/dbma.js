const MerkleTree = require('./merkle')

/**
 * Double-batched Merkle log accumulator.
 * https://ethresear.ch/t/double-batched-merkle-log-accumulator/571
 */
module.exports = class DBMA {
  constructor (bottomBufferSize = 1 << 10) {
    this.bottomForest = []
    this.bottomIdx = 0
    this.bottomBufferSize = bottomBufferSize
    this.topForest = []
  }

  get bottomBuffer () {
    let buf = []
    for (let tree of this.bottomForest) {
      buf.push(tree.root.value)
    }
    return buf
  }

  get topBuffer () {
    let buf = []
    for (let tree of this.topForest) {
      buf.push(tree.root.value)
    }
    return buf
  }

  addLogs (logs) {
    const tree = MerkleTree.fromLeaves(logs)
    this.bottomForest[this.bottomIdx] = tree

    this.bottomIdx++
    if (this.bottomIdx % this.bottomBufferSize === 0) {
      this.bottomIdx = 0
      const topTree = MerkleTree.fromLeaves(this.bottomBuffer)
      this.topForest.push(topTree)
    }
  }

  getPreWitness (log) {
    throw new Error('Not implemented')
  }

  getPermanentWitness (log) {
    throw new Error('Not implemented')
  }
}
