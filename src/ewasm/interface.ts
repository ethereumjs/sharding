import Memory from './memory'

export default interface Interface {
  _results: any
  imports: any
  setMemory(m: Memory): void
}
