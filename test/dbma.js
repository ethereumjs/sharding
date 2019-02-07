const tape = require('tape')
const DBMA = require('../src/dbma')
const Collation = require('../src/collation')
const Log = require('../src/log')

tape('DBMA', (t) => {
  let a = new DBMA(4)

  let collations = []
  for (let i = 0; i < 8; i++) {
    let logs = []
    for (let j = 0; j < 8; j++) {
      let log = new Log(i * 10 + j)
      logs.push(log.hash())
    }
    collations[i] = new Collation(i, logs)
  }

  t.test('should add logs', (st) => {
    for (let c of collations) {
      a.addLogs(c.logs)
    }

    st.isEqual(a.bottomBuffer.length, 4)
    st.isEqual(a.topBuffer.length, 2)
    st.end()
  })

  t.test('should generate pre-witness', (st) => {
    let log = collations[7].logs[1]
    let preWitness = a.getPreWitness(log)
    st.ok(preWitness.treeRoot.equals(a.bottomForest[3].root.value))
    st.end()
  })
})
