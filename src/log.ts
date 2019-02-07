const { keccak256 } = require('ethereumjs-util')

/**
 * Abstraction of a historical object (e.g. tx receipts).
 * For simplification assume log contains only one field: id.
 */
export default class Log {
  id: number

  constructor(id: number) {
    this.id = id
  }

  hash() {
    return keccak256(Buffer.from([this.id]))
  }
}
