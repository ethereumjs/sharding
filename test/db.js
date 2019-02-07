const tape = require('tape')
const ethUtil = require('ethereumjs-util')
const DB = require('../src/db')

tape('DB', (t) => {
  const db = new DB()

  const cases = []
  for (let i = 0; i < 4; i++) {
    cases.push([ethUtil.keccak256(Buffer.from([i])), Buffer.from([i])])
  }

  t.test('should put and get values', (st) => {
    for (let c of cases) {
      db.put(c[0], c[1])
    }

    for (let c of cases) {
      let v = db.get(c[0])
      st.ok(v.equals(c[1]))
    }

    st.end()
  })
})
