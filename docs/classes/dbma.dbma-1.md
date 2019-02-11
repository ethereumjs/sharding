[sharding](../README.md) > [dbma](../modules/dbma.md) > [DBMA](../classes/dbma.dbma-1.md)

# Class: DBMA

Double-batched Merkle log accumulator. [https://ethresear.ch/t/double-batched-merkle-log-accumulator/571](https://ethresear.ch/t/double-batched-merkle-log-accumulator/571)

## Hierarchy

**DBMA**

## Index

### Constructors

* [constructor](dbma.dbma-1.md#constructor)

### Properties

* [bottomBufferSize](dbma.dbma-1.md#bottombuffersize)
* [bottomForest](dbma.dbma-1.md#bottomforest)
* [bottomIdx](dbma.dbma-1.md#bottomidx)
* [db](dbma.dbma-1.md#db)
* [topForest](dbma.dbma-1.md#topforest)

### Accessors

* [bottomBuffer](dbma.dbma-1.md#bottombuffer)
* [topBuffer](dbma.dbma-1.md#topbuffer)

### Methods

* [addLogs](dbma.dbma-1.md#addlogs)
* [getPermanentWitness](dbma.dbma-1.md#getpermanentwitness)
* [getPreWitness](dbma.dbma-1.md#getprewitness)
* [getTopTree](dbma.dbma-1.md#gettoptree)
* [verifyPermanentWitness](dbma.dbma-1.md#verifypermanentwitness)
* [verifyPreWitness](dbma.dbma-1.md#verifyprewitness)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new DBMA**(bottomBufferSize?: *`number`*): [DBMA](dbma.dbma-1.md)

*Defined in [dbma.ts:28](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L28)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` bottomBufferSize | `number` |  1 &lt;&lt; 10 |

**Returns:** [DBMA](dbma.dbma-1.md)

___

## Properties

<a id="bottombuffersize"></a>

###  bottomBufferSize

**● bottomBufferSize**: *`number`*

*Defined in [dbma.ts:26](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L26)*

___
<a id="bottomforest"></a>

###  bottomForest

**● bottomForest**: *[MerkleTree](merkle.merkletree.md)[]*

*Defined in [dbma.ts:24](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L24)*

___
<a id="bottomidx"></a>

###  bottomIdx

**● bottomIdx**: *`number`*

*Defined in [dbma.ts:25](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L25)*

___
<a id="db"></a>

###  db

**● db**: *[DB](db.db-1.md)*

*Defined in [dbma.ts:28](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L28)*

___
<a id="topforest"></a>

###  topForest

**● topForest**: *[MerkleTree](merkle.merkletree.md)[]*

*Defined in [dbma.ts:27](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L27)*

___

## Accessors

<a id="bottombuffer"></a>

###  bottomBuffer

getbottomBuffer(): `Buffer`[]

*Defined in [dbma.ts:38](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L38)*

**Returns:** `Buffer`[]

___
<a id="topbuffer"></a>

###  topBuffer

gettopBuffer(): `Buffer`[]

*Defined in [dbma.ts:47](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L47)*

**Returns:** `Buffer`[]

___

## Methods

<a id="addlogs"></a>

###  addLogs

▸ **addLogs**(logs: *`Buffer`[]*): `void`

*Defined in [dbma.ts:56](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L56)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| logs | `Buffer`[] |

**Returns:** `void`

___
<a id="getpermanentwitness"></a>

###  getPermanentWitness

▸ **getPermanentWitness**(log: *`Buffer`*): `PermanentWitness`

*Defined in [dbma.ts:96](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L96)*

Return permanent witness for log. This witness can be generated only after the log has been accumulated in the top buffer.

**Parameters:**

| Name | Type |
| ------ | ------ |
| log | `Buffer` |

**Returns:** `PermanentWitness`

___
<a id="getprewitness"></a>

###  getPreWitness

▸ **getPreWitness**(log: *`Buffer`*): `PreWitness`

*Defined in [dbma.ts:74](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L74)*

Pre-witness is a temporary witness, which is valid before a log has been added to the top buffer.

**Parameters:**

| Name | Type |
| ------ | ------ |
| log | `Buffer` |

**Returns:** `PreWitness`

___
<a id="gettoptree"></a>

###  getTopTree

▸ **getTopTree**(root: *`Buffer`*): [MerkleTree](merkle.merkletree.md)

*Defined in [dbma.ts:148](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L148)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| root | `Buffer` |

**Returns:** [MerkleTree](merkle.merkletree.md)

___
<a id="verifypermanentwitness"></a>

###  verifyPermanentWitness

▸ **verifyPermanentWitness**(witness: *`PermanentWitness`*): `boolean`

*Defined in [dbma.ts:141](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L141)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| witness | `PermanentWitness` |

**Returns:** `boolean`

___
<a id="verifyprewitness"></a>

###  verifyPreWitness

▸ **verifyPreWitness**(witness: *`PreWitness`*): `boolean`

*Defined in [dbma.ts:128](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/dbma.ts#L128)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| witness | `PreWitness` |

**Returns:** `boolean`

___

