/**
 * Simplified abstract of a shard collation.
 */
module.exports = class Collation {
  constructor (number, logs) {
    this.number = number
    this.logs = logs
    this.transactions = []
  }
}
