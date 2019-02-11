import * as tape from 'tape'
import { DBMA, Collation, Log } from '../src'

tape('DBMA', t => {
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

  t.test('should add logs', st => {
    for (const c of collations) {
      a.addLogs(c.logs)
    }

    st.isEqual(a.bottomBuffer.length, 4)
    st.isEqual(a.topBuffer.length, 2)
    st.end()
  })

  t.test('should generate and verify pre-witness', st => {
    const log = collations[7].logs[1]
    const preWitness = a.getPreWitness(log)
    st.ok(preWitness.treeRoot.equals(a.bottomForest[3].root!.value))
    const ok = a.verifyPreWitness(preWitness)
    st.ok(ok)
    st.end()
  })

  t.test('should generate and verify permanent witness', st => {
    const log = collations[1].logs[2]
    const witness = a.getPermanentWitness(log)
    st.ok(witness.topRoot.equals(a.topForest[0].root!.value))
    const ok = a.verifyPermanentWitness(witness)
    st.ok(ok)
    st.end()
  })
})
