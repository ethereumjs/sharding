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
* [verifyPermanentWitness](dbma.dbma-1.md#verifypermanentwitness)
* [verifyPreWitness](dbma.dbma-1.md#verifyprewitness)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new DBMA**(bottomBufferSize?: *`number`*): [DBMA](dbma.dbma-1.md)

*Defined in [dbma.ts:28](https://github.com/ethereumjs/sharding/blob/1ee551a/src/dbma.ts#L28)*

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

*Defined in [dbma.ts:26](https://github.com/ethereumjs/sharding/blob/1ee551a/src/dbma.ts#L26)*

___
<a id="bottomforest"></a>

###  bottomForest

**● bottomForest**: *[MerkleTree](merkle.merkletree.md)[]*

*Defined in [dbma.ts:24](https://github.com/ethereumjs/sharding/blob/1ee551a/src/dbma.ts#L24)*

___
<a id="bottomidx"></a>

###  bottomIdx

**● bottomIdx**: *`number`*

*Defined in [dbma.ts:25](https://github.com/ethereumjs/sharding/blob/1ee551a/src/dbma.ts#L25)*

___
<a id="db"></a>

###  db

**● db**: *[DB](db.db-1.md)*

*Defined in [dbma.ts:28](https://github.com/ethereumjs/sharding/blob/1ee551a/src/dbma.ts#L28)*

___
<a id="topforest"></a>

###  topForest

**● topForest**: *[MerkleTree](merkle.merkletree.md)[]*

*Defined in [dbma.ts:27](https://github.com/ethereumjs/sharding/blob/1ee551a/src/dbma.ts#L27)*

___

## Accessors

<a id="bottombuffer"></a>

###  bottomBuffer

getbottomBuffer(): `Buffer`[]

*Defined in [dbma.ts:38](https://github.com/ethereumjs/sharding/blob/1ee551a/src/dbma.ts#L38)*

**Returns:** `Buffer`[]

___
<a id="topbuffer"></a>

###  topBuffer

gettopBuffer(): `Buffer`[]

*Defined in [dbma.ts:46](https://github.com/ethereumjs/sharding/blob/1ee551a/src/dbma.ts#L46)*

**Returns:** `Buffer`[]

___

## Methods

<a id="addlogs"></a>

###  addLogs

▸ **addLogs**(logs: *`Buffer`[]*): `void`

*Defined in [dbma.ts:61](https://github.com/ethereumjs/sharding/blob/1ee551a/src/dbma.ts#L61)*

Adds logs to the accumulator, by forming a merkle tree out of them and adding the tree to the bottom buffer. If capacity of bottom buffer is filled, forms a merkle tree out of bottom buffer and adds it to the top buffer.

**Parameters:**

| Name | Type |
| ------ | ------ |
| logs | `Buffer`[] |

**Returns:** `void`

___
<a id="getpermanentwitness"></a>

###  getPermanentWitness

▸ **getPermanentWitness**(log: *`Buffer`*): [PermanentWitness](../interfaces/dbma.permanentwitness.md)

*Defined in [dbma.ts:96](https://github.com/ethereumjs/sharding/blob/1ee551a/src/dbma.ts#L96)*

Return permanent witness for log. This witness can be generated only after the log has been accumulated in the top buffer.

**Parameters:**

| Name | Type |
| ------ | ------ |
| log | `Buffer` |

**Returns:** [PermanentWitness](../interfaces/dbma.permanentwitness.md)

___
<a id="getprewitness"></a>

###  getPreWitness

▸ **getPreWitness**(log: *`Buffer`*): [PreWitness](../interfaces/dbma.prewitness.md)

*Defined in [dbma.ts:78](https://github.com/ethereumjs/sharding/blob/1ee551a/src/dbma.ts#L78)*

Pre-witness is a temporary witness, which is valid before a log has been added to the top buffer.

**Parameters:**

| Name | Type |
| ------ | ------ |
| log | `Buffer` |

**Returns:** [PreWitness](../interfaces/dbma.prewitness.md)

___
<a id="verifypermanentwitness"></a>

###  verifyPermanentWitness

▸ **verifyPermanentWitness**(witness: *[PermanentWitness](../interfaces/dbma.permanentwitness.md)*): `boolean`

*Defined in [dbma.ts:147](https://github.com/ethereumjs/sharding/blob/1ee551a/src/dbma.ts#L147)*

Verifies a permanent witness by checking top and bottom merkle branches. It further checks that the top merkle leaf is the same as the bottom tree root.

**Parameters:**

| Name | Type |
| ------ | ------ |
| witness | [PermanentWitness](../interfaces/dbma.permanentwitness.md) |

**Returns:** `boolean`

___
<a id="verifyprewitness"></a>

###  verifyPreWitness

▸ **verifyPreWitness**(witness: *[PreWitness](../interfaces/dbma.prewitness.md)*): `boolean`

*Defined in [dbma.ts:130](https://github.com/ethereumjs/sharding/blob/1ee551a/src/dbma.ts#L130)*

Verifies a pre-witness, by finding the bottom tree that has the same root as in witness, and then verifies the merkle branch.

**Parameters:**

| Name | Type |
| ------ | ------ |
| witness | [PreWitness](../interfaces/dbma.prewitness.md) |

**Returns:** `boolean`

___

