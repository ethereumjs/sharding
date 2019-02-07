const MerkleTree = require('./merkle')
const DB = require('./db')

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
    this.db = new DB()
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
    this.db.put(tree.root.value, tree.toRLP())

    this.bottomIdx++
    if (this.bottomIdx % this.bottomBufferSize === 0) {
      this.bottomIdx = 0
      const topTree = MerkleTree.fromLeaves(this.bottomBuffer)
      this.topForest.push(topTree)
    }
  }

  /**
   * Pre-witness is a temporary witness, which is valid
   * before a log has been added to the top buffer.
   */
  getPreWitness (log) {
    for (let tree of this.bottomForest) {
      if (!tree.hasLeaf(log)) {
        continue
      }

      const proof = tree.prove(log)
      return { treeRoot: tree.root.value, treeBranch: proof }
    }

    throw new Error('Log not in bottom forest')
  }

  /**
   * Return permanent witness for log. This witness can be
   * generated only after the log has been accumulated in
   * the top buffer.
   */
  getPermanentWitness (log) {
    for (let topTree of this.topForest) {
      for (let k in topTree.leaves) {
        let topLeaf = topTree.leaves[k]
        let serializedBottomTree = this.db.get(topLeaf.value)
        let bottomTree = MerkleTree.fromRLP(serializedBottomTree)
        if (!bottomTree.hasLeaf(log)) {
          continue
        }

        const bottomProof = bottomTree.prove(log)
        const topProof = topTree.prove(topLeaf.value)

        return {
          topRoot: topTree.root.value,
          topProof: topProof,
          bottomProof: bottomProof
        }
      }
    }

    throw new Error('Log not in accumulator')
  }
}
