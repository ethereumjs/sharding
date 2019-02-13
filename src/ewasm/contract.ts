/**
 * @module ewasm
 */
const assert = require('assert')
import Interface from './interface'
import Memory from './memory'

/**
 * Represents an ewasm module. It instantiates the module
 * on `run`, and expects `main` and `memory` to be exported.
 * A limited subset of EEI is provided to be imported by
 * the module.
 */
export default class Contract {
  _module: WebAssembly.Module

  /**
   * @param code - WASM binary code
   */
  constructor(code: WebAssembly.BufferSource) {
    this._module = new WebAssembly.Module(code)
  }

  /**
   * Instantiates the module, providing a subset of EEI as
   * imports, and then executes the exported `main` function.
   * @param opts - Environment data required for the call
   * @returns result of execution as an Object.
   */
  run(env: Interface) {
    const instance = new WebAssembly.Instance(this._module, env.imports)

    assert(instance.exports.main, 'Wasm module has no main function')
    assert(instance.exports.memory, 'Wasm module has no memory exported')

    // Set calldata at the beginning of module's memory
    if (env.init.length > 0) {
      let mem = new Uint8Array(instance.exports.memory.buffer)
      // grow memory if necessary
      if (mem.length < env.init.length) {
        instance.exports.memory.grow(Math.ceil((env.init.length - mem.length) / 65536))
        mem = new Uint8Array(instance.exports.memory.buffer)
      }

      // copy buffer to memory
      mem.set(env.init)
    }

    const memory = new Memory(instance.exports.memory)
    env.setMemory(memory)

    // Run contract. It throws even on successful finish.
    try {
      instance.exports.main(env.init ? env.init.length : 0)
    } catch (e) {
      if (e.errorType !== 'VmError' && e.errorType !== 'FinishExecution') {
        throw e
      }
    }

    return env._results
  }
}
