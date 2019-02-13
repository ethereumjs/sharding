import Memory from './memory'

export default interface Interface {
  init: Buffer
  _results: any
  imports: any
  setMemory(m: Memory): void
}
