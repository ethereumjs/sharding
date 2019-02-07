const ethUtil = require('ethereumjs-util')
const Node = require('./node')

/**
 * Binary Merkle tree which uses keccak256 as hash function.
 */
module.exports = class MerkleTree {
  constructor () {
    this.root = null
    this.leaves = {}
  }

  /**
   * Construct Merkle tree from its leaves.
   * @param {Buffer[]} leaves - Array of leaf values (Buffer)
   */
  static fromLeaves (leaves) {
    if (!powOfTwo(leaves.length)) {
      throw new Error('Invalid number of elements')
    }

    const t = new MerkleTree()
    let leafNodes = []
    for (let leaf of leaves) {
      let node = new Node(leaf, [])
      leafNodes.push(node)
      t.leaves[leaf.toString('hex')] = node
    }
    this.leaves = leafNodes
    t.root = this.computeRootFromLeaves(leafNodes)

    return t
  }

  static computeRootFromLeaves (leaves) {
    if (leaves.length === 2) {
      let v = ethUtil.keccak256(Buffer.concat([leaves[0].value, leaves[1].value]))
      let node = new Node(v, [leaves[0], leaves[1]])
      leaves[0].parent = node
      leaves[1].parent = node
      return node
    }

    let nodes = []
    for (let i = 0; i < leaves.length; i += 2) {
      let v = ethUtil.keccak256(Buffer.concat([leaves[i].value, leaves[i + 1].value]))
      let node = new Node(v, [leaves[i], leaves[i + 1]])
      leaves[i].parent = node
      leaves[i + 1].parent = node
      nodes.push(node)
    }

    return this.computeRootFromLeaves(nodes)
  }

  prove (leaf) {
    if (!(leaf.toString('hex') in this.leaves)) {
      throw new Error('Leaf not in tree')
    }

    let branch = []
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

  verify (branch) {
    let cur = branch[0]
    let sibling = branch[1]
    cur = this._hashSiblings(cur, sibling)
    branch = branch.slice(2)
    for (let step of branch) {
      if (typeof cur.position === 'undefined') {
        cur = { value: cur, position: step.position === 'right' ? 'left' : 'right' }
      }
      cur = this._hashSiblings(cur, step)
    }

    return cur.equals(this.root.value)
  }

  _hashSiblings (n1, n2) {
    if (n1.position === 'left' && n2.position === 'right') {
      return ethUtil.keccak256(Buffer.concat([n1.value, n2.value]))
    } else if (n1.position === 'right' && n2.position === 'left') {
      return ethUtil.keccak256(Buffer.concat([n2.value, n1.value]))
    } else {
      throw new Error('Invalid proof')
    }
  }
}

function powOfTwo (n) {
  let r = n & (n - 1)
  return (n > 0) && (r === 0)
}
