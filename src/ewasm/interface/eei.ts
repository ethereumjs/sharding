/**
 * @module ewasm
 */
const assert = require('assert')
const fs = require('fs')
const path = require('path')
import BN = require('bn.js')
import { VmError, ERROR, FinishExecution } from '../../exceptions'
import Memory from '../memory'

const transformerRaw = fs.readFileSync(path.join(__dirname, '../system/transform-i64.wasm'))
const transformerModule = new WebAssembly.Module(transformerRaw)

export default class EEI {
  init: Buffer
  _data: any
  _results: any
  transformer: any
  _memory: any

  constructor(data: any) {
    this.init = Buffer.from([])
    this._data = data
    this._results = {
      gasUsed: new BN(0),
    }

    // Wasm-js api doesn't yet support i64 param/return values.
    // https://github.com/WebAssembly/proposals/issues/7
    this.transformer = new WebAssembly.Instance(transformerModule, {
      interface: {
        useGas: this._useGas.bind(this),
      },
    })
  }

  get imports() {
    return {
      ethereum: this.ethereum,
    }
  }

  get ethereum() {
    return {
      getCallValue: this.getCallValue.bind(this),
      getCallDataSize: this.getCallDataSize.bind(this),
      callDataCopy: this.callDataCopy.bind(this),
      useGas: this.transformer.exports.useGas,
      finish: this.finish.bind(this),
      revert: this.revert.bind(this),
    }
  }

  /**
   * Gets the deposited value by the instruction/transaction responsible
   * for this execution and loads it into memory at the given location.
   * @param offset - The memory offset to load the value into
   */
  getCallValue(offset: number) {
    const vBuf = this._data.value
    this._memory.write(offset, 16, vBuf)
  }

  /**
   * Returns size of input data in current environment. This pertains to the
   * input data passed with the message call instruction or transaction.
   */
  getCallDataSize() {
    return this._data.data.length
  }

  /**
   * Copies the input data in current environment to memory. This pertains to
   * the input data passed with the message call instruction or transaction.
   * @param resultOffset - The memory offset to load data into
   * @param dataOffset - The offset in the input data
   * @param length - The length of data to copy
   */
  callDataCopy(resultOffset: number, dataOffset: number, length: number) {
    const data = this._data.data.slice(dataOffset, dataOffset + length)
    this._memory.write(resultOffset, length, data)
  }

  _useGas(high: number, low: number) {
    const amount = fromI64(high, low)
    this.useGas(new BN(amount))
  }

  /**
   * Subtracts an amount from the gas counter.
   * @param amount - The amount to subtract to the gas counter
   * @throws VmError if gas limit is exceeded
   */
  useGas(amount: BN) {
    const gasUsed = this._results.gasUsed.add(amount)
    if (this._data.gasLimit.lt(gasUsed)) {
      this._results.exception = 0
      this._results.exceptionError = ERROR.OUT_OF_GAS
      this._results.gasUsed = this._data.gasLimit
      this._results.return = Buffer.from([])
      throw new VmError(ERROR.OUT_OF_GAS)
    }

    this._results.gasUsed = gasUsed
  }

  /**
   * Set the returning output data for the execution.
   * This will halt the execution immediately.
   * @param offset - The memory offset of the output data
   * @param length - The length of the output data
   * @throws FinishExecution
   */
  finish(offset: number, length: number) {
    let ret = Buffer.from([])
    if (length) {
      ret = Buffer.from(this._memory.read(offset, length))
    }

    // 1 = success
    this._results.exception = 1
    this._results.return = ret

    throw new FinishExecution('WASM execution finished, should halt')
  }

  /**
   * Set the returning output data for the execution. This will
   * halt the execution immediately and set the execution
   * result to "reverted".
   * @param offset - The memory offset of the output data
   * @param length - The length of the output data
   * @throws VmError
   */
  revert(offset: number, length: number) {
    let ret = Buffer.from([])
    if (length) {
      ret = Buffer.from(this._memory.read(offset, length))
    }

    this._results.exception = 0
    this._results.exceptionError = ERROR.REVERT
    this._results.gasUsed = this._data.gasLimit
    this._results.return = ret

    throw new VmError(ERROR.REVERT)
  }

  setMemory(memory: Memory) {
    this._memory = memory
  }
}

// Converts a 64 bit number represented by `high` and `low`, back to a JS numbers
// Adopted from https://github.com/ewasm/ewasm-kernel/blob/master/EVMimports.js
function fromI64(high: number, low: number) {
  if (high < 0) {
    // convert from a 32-bit two's compliment
    high = 0x100000000 - high
  }

  // High shouldn't have any bits set between 32-21
  assert((high & 0xffe00000) === 0, 'Failed to convert wasm i64 to JS numbers')

  if (low < 0) {
    // convert from a 32-bit two's compliment
    low = 0x100000000 - low
  }
  // JS only bitshift 32bits, so instead of high << 32 we have high * 2 ^ 32
  return high * 4294967296 + low
}
