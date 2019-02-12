/**
 * @module ewasm
 */

/**
 * Wrapper around a WASM memory object.
 */
export default class Memory {
  raw: WebAssembly.Memory

  constructor(raw: WebAssembly.Memory) {
    this.raw = raw
  }

  write(offset: number, length: number, value: Buffer) {
    const m = new Uint8Array(this.raw.buffer, offset, length)
    m.set(value)
  }

  read(offset: number, length: number) {
    return new Uint8Array(this.raw.buffer, offset, length)
  }
}
