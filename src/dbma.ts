import MerkleTree from './merkle'
import DB from './db'

interface PreWitness {
  treeRoot: Buffer
  treeBranch: any
}

interface PermanentWitness {
  topRoot: Buffer
  topProof: any
  bottomRoot: Buffer
  bottomProof: any
}

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
  getPreWitness(log: Buffer): PreWitness {
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
  getPermanentWitness(log: Buffer): PermanentWitness {
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
          bottomRoot: bottomTree.root!.value,
          bottomProof: bottomProof,
        }
      }
    }

    throw new Error('Log not in accumulator')
  }

  verifyPreWitness(witness: PreWitness): boolean {
    const treeRoot = witness.treeRoot
    for (const tree of this.bottomForest) {
      if (!tree.root!.value.equals(treeRoot)) {
        continue
      }

      return MerkleTree.verify(treeRoot, witness.treeBranch)
    }

    throw new Error('Bottom tree not in accumulator')
  }

  verifyPermanentWitness(witness: PermanentWitness): boolean {
    const topTree = this.getTopTree(witness.topRoot)
    if (!MerkleTree.verify(witness.topRoot, witness.topProof)) {
      return false
    }
    return MerkleTree.verify(witness.bottomRoot, witness.bottomProof)
  }

  getTopTree(root: Buffer): MerkleTree {
    for (const tree of this.topForest) {
      if (!tree.root!.value.equals(root)) {
        continue
      }

      return tree
    }

    throw new Error('Top tree not found')
  }
}
