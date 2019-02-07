/**
 * Simplified abstract of a shard collation.
 */
export default class Collation {
  n: number
  logs: Buffer[]

  constructor(n: number, logs: Buffer[]) {
    this.n = n
    this.logs = logs
  }
}
