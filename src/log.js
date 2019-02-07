const ethUtil = require('ethereumjs-util')

/**
 * Abstraction of a historical object (e.g. tx receipts).
 * For simplification assume log contains only one field: id.
 */
module.exports = class Log {
  constructor (id) {
    this.id = id
  }

  hash () {
    return ethUtil.keccak256(Buffer.from([this.id]))
  }
}
