[sharding](../README.md) > [merkle](../modules/merkle.md) > [MerkleTree](../classes/merkle.merkletree.md)

# Class: MerkleTree

Binary Merkle tree which uses keccak256 as hash function.

## Hierarchy

**MerkleTree**

## Index

### Constructors

* [constructor](merkle.merkletree.md#constructor)

### Properties

* [leaves](merkle.merkletree.md#leaves)
* [root](merkle.merkletree.md#root)

### Methods

* [hasLeaf](merkle.merkletree.md#hasleaf)
* [prove](merkle.merkletree.md#prove)
* [toRLP](merkle.merkletree.md#torlp)
* [verify](merkle.merkletree.md#verify)
* [_hashSiblings](merkle.merkletree.md#_hashsiblings)
* [computeRootFromLeaves](merkle.merkletree.md#computerootfromleaves)
* [fromLeaves](merkle.merkletree.md#fromleaves)
* [fromRLP](merkle.merkletree.md#fromrlp)
* [verify](merkle.merkletree.md#verify-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MerkleTree**(): [MerkleTree](merkle.merkletree.md)

*Defined in [merkle/tree.ts:13](https://github.com/ethereumjs/sharding/blob/1ee551a/src/merkle/tree.ts#L13)*

**Returns:** [MerkleTree](merkle.merkletree.md)

___

## Properties

<a id="leaves"></a>

###  leaves

**● leaves**: *`any`*

*Defined in [merkle/tree.ts:13](https://github.com/ethereumjs/sharding/blob/1ee551a/src/merkle/tree.ts#L13)*

___
<a id="root"></a>

###  root

**● root**: *[Node](merkle.node.md)*

*Defined in [merkle/tree.ts:12](https://github.com/ethereumjs/sharding/blob/1ee551a/src/merkle/tree.ts#L12)*

___

## Methods

<a id="hasleaf"></a>

###  hasLeaf

▸ **hasLeaf**(leaf: *`Buffer`*): `boolean`

*Defined in [merkle/tree.ts:114](https://github.com/ethereumjs/sharding/blob/1ee551a/src/merkle/tree.ts#L114)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| leaf | `Buffer` |

**Returns:** `boolean`

___
<a id="prove"></a>

###  prove

▸ **prove**(leaf: *`Buffer`*): `object`[]

*Defined in [merkle/tree.ts:92](https://github.com/ethereumjs/sharding/blob/1ee551a/src/merkle/tree.ts#L92)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| leaf | `Buffer` |

**Returns:** `object`[]

___
<a id="torlp"></a>

###  toRLP

▸ **toRLP**(): `Buffer`

*Defined in [merkle/tree.ts:122](https://github.com/ethereumjs/sharding/blob/1ee551a/src/merkle/tree.ts#L122)*

Serializes tree to RLP. Serialized version includes the leaves and the root hash (for verification).

**Returns:** `Buffer`

___
<a id="verify"></a>

###  verify

▸ **verify**(branch: *`any`*): `boolean`

*Defined in [merkle/tree.ts:110](https://github.com/ethereumjs/sharding/blob/1ee551a/src/merkle/tree.ts#L110)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| branch | `any` |

**Returns:** `boolean`

___
<a id="_hashsiblings"></a>

### `<Static>` _hashSiblings

▸ **_hashSiblings**(n1: *`any`*, n2: *`any`*): `Buffer`

*Defined in [merkle/tree.ts:131](https://github.com/ethereumjs/sharding/blob/1ee551a/src/merkle/tree.ts#L131)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n1 | `any` |
| n2 | `any` |

**Returns:** `Buffer`

___
<a id="computerootfromleaves"></a>

### `<Static>` computeRootFromLeaves

▸ **computeRootFromLeaves**(leaves: *[Node](merkle.node.md)[]*): [Node](merkle.node.md)

*Defined in [merkle/tree.ts:41](https://github.com/ethereumjs/sharding/blob/1ee551a/src/merkle/tree.ts#L41)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| leaves | [Node](merkle.node.md)[] |

**Returns:** [Node](merkle.node.md)

___
<a id="fromleaves"></a>

### `<Static>` fromLeaves

▸ **fromLeaves**(leaves: *`Buffer`[]*): [MerkleTree](merkle.merkletree.md)

*Defined in [merkle/tree.ts:24](https://github.com/ethereumjs/sharding/blob/1ee551a/src/merkle/tree.ts#L24)*

Construct Merkle tree from its leaves.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| leaves | `Buffer`[] |  Array of leaf values |

**Returns:** [MerkleTree](merkle.merkletree.md)

___
<a id="fromrlp"></a>

### `<Static>` fromRLP

▸ **fromRLP**(buf: *`Buffer`*): [MerkleTree](merkle.merkletree.md)

*Defined in [merkle/tree.ts:67](https://github.com/ethereumjs/sharding/blob/1ee551a/src/merkle/tree.ts#L67)*

Constructs tree from a RLP-encoded buffer which contains the root and leaf values as an array.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| buf | `Buffer` |  RLP-encoded tree |

**Returns:** [MerkleTree](merkle.merkletree.md)

___
<a id="verify-1"></a>

### `<Static>` verify

▸ **verify**(root: *`Buffer`*, branch: *`any`*): `boolean`

*Defined in [merkle/tree.ts:77](https://github.com/ethereumjs/sharding/blob/1ee551a/src/merkle/tree.ts#L77)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| root | `Buffer` |
| branch | `any` |

**Returns:** `boolean`

___

