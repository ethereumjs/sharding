import test from 'ava'
import Memory from '../../src/ewasm/memory'

test('should be initially empty', t => {
  const wm = new WebAssembly.Memory({ initial: 0, maximum: 100 })
  const m = new Memory(wm)

  t.throws(() => m.read(0, 1))
})
