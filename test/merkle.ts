import test from 'ava'
const ethUtil = require('ethereumjs-util')
import MerkleTree from '../src/merkle'

test('should prove leaf', t => {
  const leaves: Buffer[] = []
  for (let i = 0; i < 4; i++) {
    leaves.push(ethUtil.keccak256(Buffer.from([i])))
  }

  const tree = MerkleTree.fromLeaves(leaves)

  const proof = tree.prove(leaves[1])
  const ok = tree.verify(proof)
  t.true(ok)
})
