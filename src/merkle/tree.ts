const ethUtil = require('ethereumjs-util')
import { encode, decode, Input } from 'rlp'
import Node from './node'

/**
 * Binary Merkle tree which uses keccak256 as hash function.
 */
export default class MerkleTree {
  root: Node | null
  leaves: any

  constructor() {
    this.root = null
    this.leaves = {}
  }

  /**
   * Construct Merkle tree from its leaves.
   * @param leaves - Array of leaf values
   */
  static fromLeaves(leaves: Buffer[]): MerkleTree {
    if (!powOfTwo(leaves.length)) {
      throw new Error('Invalid number of elements')
    }

    const t = new MerkleTree()
    const leafNodes = []
    for (const leaf of leaves) {
      const node = new Node(leaf, [])
      leafNodes.push(node)
      t.leaves[leaf.toString('hex')] = node
    }
    // this.leaves = leafNodes
    t.root = this.computeRootFromLeaves(leafNodes)

    return t
  }

  static computeRootFromLeaves(leaves: Node[]): Node {
    if (leaves.length === 2) {
      const v = ethUtil.keccak256(Buffer.concat([leaves[0].value, leaves[1].value]))
      const node = new Node(v, [leaves[0], leaves[1]])
      leaves[0].parent = node
      leaves[1].parent = node
      return node
    }

    const nodes = []
    for (let i = 0; i < leaves.length; i += 2) {
      const v = ethUtil.keccak256(Buffer.concat([leaves[i].value, leaves[i + 1].value]))
      const node = new Node(v, [leaves[i], leaves[i + 1]])
      leaves[i].parent = node
      leaves[i + 1].parent = node
      nodes.push(node)
    }

    return this.computeRootFromLeaves(nodes)
  }

  /**
   * Constructs tree from a RLP-encoded buffer which
   * contains the root and leaf values as an array.
   * @param buf - RLP-encoded tree
   */
  static fromRLP(buf: Buffer): MerkleTree {
    const decoded = <Buffer[]>decode(<Input>buf)
    const t = this.fromLeaves(decoded.slice(1))
    if (t.root === null || !t.root.value.equals(decoded[0])) {
      throw new Error('Re-constructed tree has different root')
    }

    return t
  }

  prove(leaf: Buffer) {
    if (!(leaf.toString('hex') in this.leaves)) {
      throw new Error('Leaf not in tree')
    }

    if (this.root === null) {
      throw new Error('Tree has no root')
    }

    const branch = []
    let cur = this.leaves[leaf.toString('hex')]
    branch.push({ value: cur.value, position: cur.getPosition() })
    while (cur.value !== this.root.value) {
      const sibling = cur.getSibling()
      const pos = sibling.getPosition()
      branch.push({ value: sibling.value, position: pos })
      cur = cur.parent
    }

    return branch
  }

  verify(branch: any): boolean {
    if (this.root === null) {
      throw new Error('Tree has no root')
    }

    let cur = branch[0]
    const sibling = branch[1]
    cur = this._hashSiblings(cur, sibling)
    branch = branch.slice(2)
    for (const step of branch) {
      if (typeof cur.position === 'undefined') {
        cur = { value: cur, position: step.position === 'right' ? 'left' : 'right' }
      }
      cur = this._hashSiblings(cur, step)
    }

    return cur.equals(this.root.value)
  }

  hasLeaf(leaf: Buffer): boolean {
    return leaf.toString('hex') in this.leaves
  }

  /**
   * Serializes tree to RLP. Serialized version includes the leaves
   * and the root hash (for verification).
   */
  toRLP(): Buffer {
    if (this.root === null) {
      throw new Error('Tree has no root')
    }

    const data = [this.root.value]
    for (const k in this.leaves) {
      const leaf = this.leaves[k]
      data.push(leaf.value)
    }
    return encode(data)
  }

  _hashSiblings(n1: any, n2: any): Buffer {
    if (n1.position === 'left' && n2.position === 'right') {
      return ethUtil.keccak256(Buffer.concat([n1.value, n2.value]))
    } else if (n1.position === 'right' && n2.position === 'left') {
      return ethUtil.keccak256(Buffer.concat([n2.value, n1.value]))
    } else {
      throw new Error('Invalid proof')
    }
  }
}

function powOfTwo(n: number): boolean {
  const r = n & (n - 1)
  return n > 0 && r === 0
}
