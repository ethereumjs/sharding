export declare function getCallDataSize(): u32
export declare function callDataCopy(resultOffset: u32, dataOffset: u32, dataLength: u32): void
export declare function storageLoad(pathOffset: u32, resultOffset: u32): void
export declare function storageStore(pathOffset: u32, valueOffset: u32): void
export declare function call(
  addressOffset: u32,
  valueOffset: u32,
  dataOffset: u32,
  dataLength: u32,
): u8
export declare function finish(dataOffset: u32, dataLength: u32): void
