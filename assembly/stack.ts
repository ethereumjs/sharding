export class Stack {
  raw: u8[]
  size: u32
  length: u32

  constructor(size: u32 = 1024) {
    this.raw = new Array<u8>(1024)
    this.size = size
    this.length = 0
  }

  push(v: u8): void {
    if (this.length >= this.size) {
      unreachable()
    }

    this.raw.push(v)
    this.length++
  }

  pushBytes(v: u8[], length: u32): void {
    if (v.length !== length) {
      unreachable()
    }

    if (this.length + length > this.size) {
      unreachable()
    }

    this.raw = this.raw.concat(v)
    this.length += length
  }

  pop(): u8 {
    if (this.length === 0) {
      unreachable()
    }

    let val = this.raw.pop()
    this.length--
    return val
  }

  /**
   * Pops multiple bytes off the stack. Bytes are
   * returned in the same order they were inserted.
   */
  popBytes(num: u32): u8[] {
    if (num > this.length) {
      unreachable()
    }

    const res = new Array<u8>(num)
    for (let i = num - 1; i >= 0; i--) {
      res[i] = this.raw.pop()
    }
    this.length -= num

    return res
  }
}
