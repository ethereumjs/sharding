module.exports = class DB {
  constructor () {
    this._db = new Map()
  }

  put (key, value) {
    this._db.set(key.toString('hex'), value)
  }

  get (key) {
    return this._db.get(key.toString('hex'))
  }

  del (key) {
    return this._db.delete(key.toString('hex'))
  }
}
