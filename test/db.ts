import * as tape from 'tape'
const ethUtil = require('ethereumjs-util')
import DB from '../src/db'

tape('DB', t => {
  const db = new DB()

  const cases: Buffer[][] = []
  for (let i = 0; i < 4; i++) {
    cases.push([ethUtil.keccak256(Buffer.from([i])), Buffer.from([i])])
  }

  t.test('should put and get values', st => {
    for (const c of cases) {
      db.put(c[0], c[1])
    }

    for (const c of cases) {
      const v = db.get(c[0])
      st.ok(v!.equals(c[1]))
    }

    st.end()
  })
})
