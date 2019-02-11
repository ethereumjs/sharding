/**
 * @module dbma
 */
import MerkleTree from './merkle'
import DB from './db'

export interface PreWitness {
  root: Buffer
  branch: any
}

export interface PermanentWitness {
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
      buf.push(tree.root.value)
    }
    return buf
  }

  get topBuffer(): Buffer[] {
    const buf = []
    for (const tree of this.topForest) {
      buf.push(tree.root.value)
    }
    return buf
  }

  /**
   * Adds logs to the accumulator, by forming a merkle
   * tree out of them and adding the tree to the bottom
   * buffer. If capacity of bottom buffer is filled, forms
   * a merkle tree out of bottom buffer and adds it to the
   * top buffer.
   */
  addLogs(logs: Buffer[]): void {
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
  getPreWitness(log: Buffer): PreWitness {
    for (const tree of this.bottomForest) {
      if (!tree.hasLeaf(log)) {
        continue
      }

      const proof = tree.prove(log)
      return { root: tree.root.value, branch: proof }
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
          bottomRoot: bottomTree.root.value,
          bottomProof: bottomProof,
        }
      }
    }

    throw new Error('Log not in accumulator')
  }

  /**
   * Verifies a pre-witness, by finding the bottom tree
   * that has the same root as in witness, and then
   * verifies the merkle branch.
   */
  verifyPreWitness(witness: PreWitness): boolean {
    const treeRoot = witness.root
    for (const root of this.bottomBuffer) {
      if (!root.equals(treeRoot)) {
        continue
      }

      return MerkleTree.verify(root, witness.branch)
    }

    throw new Error('Bottom tree not in accumulator')
  }

  /** Verifies a permanent witness by checking top and
   * bottom merkle branches. It further checks that the top
   * merkle leaf is the same as the bottom tree root.
   */
  verifyPermanentWitness(witness: PermanentWitness): boolean {
    if (!MerkleTree.verify(witness.topRoot, witness.topProof)) {
      return false
    }
    if (!witness.bottomRoot.equals(witness.topProof[0].value)) {
      return false
    }
    return MerkleTree.verify(witness.bottomRoot, witness.bottomProof)
  }
}
