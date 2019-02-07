import MerkleTree from './merkle'
import DB from './db'

/**
 * Double-batched Merkle log accumulator.
 * https://ethresear.ch/t/double-batched-merkle-log-accumulator/571
 */
export default class DBMA {
  bottomForest: MerkleTree[]
  bottomIdx: number
  bottomBufferSize: number
  topForest: MerkleTree[]
  db: DB

  constructor(bottomBufferSize = 1 << 10) {
    this.bottomForest = []
    this.bottomIdx = 0
    this.bottomBufferSize = bottomBufferSize
    this.topForest = []
    this.db = new DB()
  }

  get bottomBuffer(): Buffer[] {
    const buf = []
    for (const tree of this.bottomForest) {
      if (tree.root === null) throw new Error('Tree has no root')
      buf.push(tree.root.value)
    }
    return buf
  }

  get topBuffer(): Buffer[] {
    const buf = []
    for (const tree of this.topForest) {
      if (tree.root === null) throw new Error('Tree has no root')
      buf.push(tree.root.value)
    }
    return buf
  }

  addLogs(logs: Buffer[]): void {
    const tree = MerkleTree.fromLeaves(logs)
    if (tree.root === null) throw new Error('Tree has no root')
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
  getPreWitness(log: Buffer) {
    for (const tree of this.bottomForest) {
      if (tree.root === null) {
        throw new Error('Tree has no root')
      }

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
  getPermanentWitness(log: Buffer) {
    for (const topTree of this.topForest) {
      if (topTree.root === null) {
        throw new Error('Top tree has no root')
      }
      for (const k in topTree.leaves) {
        const topLeaf = topTree.leaves[k]
        const serializedBottomTree = this.db.get(topLeaf.value)
        if (typeof serializedBottomTree === 'undefined') {
          throw new Error('Bottom tree is not in db')
        }

        const bottomTree = MerkleTree.fromRLP(serializedBottomTree)
        if (!bottomTree.hasLeaf(log)) {
          continue
        }

        const bottomProof = bottomTree.prove(log)
        const topProof = topTree.prove(topLeaf.value)

        return {
          topRoot: topTree.root.value,
          topProof: topProof,
          bottomProof: bottomProof,
        }
      }
    }

    throw new Error('Log not in accumulator')
  }
}
