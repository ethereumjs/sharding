const tape = require('tape')
const ethUtil = require('ethereumjs-util')
const MerkleTree = require('../src/merkle')

tape('MerkleTree', (t) => {
  let tree
  let leaves = []
  for (let i = 0; i < 4; i++) {
    leaves.push(ethUtil.keccak256(Buffer.from([i])))
  }

  t.test('should construct from leaves', async (st) => {
    tree = MerkleTree.fromLeaves(leaves)
    st.end()
  })

  t.test('should prove leaf', async (st) => {
    const proof = tree.prove(leaves[1])
    const ok = tree.verify(proof)
    st.ok(ok)
    st.end()
  })
})
