/**
 * @module ewasm
 */
const assert = require('assert')
import Env from './env'
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
  run(opts: any) {
    const env = new Env(opts)

    const instance = new WebAssembly.Instance(this._module, env.imports)

    assert(instance.exports.main, 'Wasm module has no main function')
    assert(instance.exports.memory, 'Wasm module has no memory exported')

    const memory = new Memory(instance.exports.memory)
    env.setMemory(memory)

    // Run contract. It throws even on successful finish.
    try {
      instance.exports.main()
    } catch (e) {
      if (e.errorType !== 'VmError' && e.errorType !== 'FinishExecution') {
        throw e
      }
    }

    return env._results
  }
}
