import anyTest, { TestInterface } from 'ava'
import { DBMA, Collation, Log } from '../../src'

const test = anyTest as TestInterface<{ a: DBMA; collations: Collation[] }>

test.before('DBMA', t => {
  const a = new DBMA(4)

  const collations: Collation[] = []
  for (let i = 0; i < 8; i++) {
    const logs: Buffer[] = []
    for (let j = 0; j < 8; j++) {
      const log = new Log(i * 10 + j)
      logs.push(log.hash())
    }
    collations[i] = new Collation(i, logs)
  }

  t.context.a = a
  t.context.collations = collations
})

test.serial('should add logs', t => {
  const a = t.context.a
  for (const c of t.context.collations) {
    a.addLogs(c.logs)
  }

  t.is(a.bottomBuffer.length, 4)
  t.is(a.topBuffer.length, 2)
})

test.serial('should generate and verify pre-witness', t => {
  const a = t.context.a
  const log = t.context.collations[7].logs[1]
  const preWitness = a.getPreWitness(log)
  t.true(preWitness.root.equals(a.bottomForest[3].root.value))
  const ok = a.verifyPreWitness(preWitness)
  t.true(ok)
})

test.serial('should generate and verify permanent witness', t => {
  const a = t.context.a
  const log = t.context.collations[1].logs[2]
  const witness = a.getPermanentWitness(log)
  t.true(witness.topRoot.equals(a.topForest[0].root.value))
  const ok = a.verifyPermanentWitness(witness)
  t.true(ok)
})
