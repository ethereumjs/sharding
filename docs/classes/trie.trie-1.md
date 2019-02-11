[sharding](../README.md) > [trie](../modules/trie.md) > [Trie](../classes/trie.trie-1.md)

# Class: Trie

Wrapper around SecureTrie from merkle-patricia-tree, which promisifies methods and hashes the key for prove and verifyProof.

## Hierarchy

**Trie**

## Index

### Constructors

* [constructor](trie.trie-1.md#constructor)

### Properties

* [wrapped](trie.trie-1.md#wrapped)

### Methods

* [get](trie.trie-1.md#get)
* [prove](trie.trie-1.md#prove)
* [put](trie.trie-1.md#put)
* [putRaw](trie.trie-1.md#putraw)
* [verifyProof](trie.trie-1.md#verifyproof)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Trie**(wrapped?: *`any`*): [Trie](trie.trie-1.md)

*Defined in [trie/index.ts:14](https://github.com/ethereumjs/sharding/blob/1ee551a/src/trie/index.ts#L14)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` wrapped | `any` |  new MPT() |

**Returns:** [Trie](trie.trie-1.md)

___

## Properties

<a id="wrapped"></a>

###  wrapped

**● wrapped**: *`any`*

*Defined in [trie/index.ts:14](https://github.com/ethereumjs/sharding/blob/1ee551a/src/trie/index.ts#L14)*

___

## Methods

<a id="get"></a>

###  get

▸ **get**(key: *`Buffer`*): `any`

*Defined in [trie/index.ts:34](https://github.com/ethereumjs/sharding/blob/1ee551a/src/trie/index.ts#L34)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Buffer` |

**Returns:** `any`

___
<a id="prove"></a>

###  prove

▸ **prove**(key: *`Buffer`*): `any`

*Defined in [trie/index.ts:26](https://github.com/ethereumjs/sharding/blob/1ee551a/src/trie/index.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Buffer` |

**Returns:** `any`

___
<a id="put"></a>

###  put

▸ **put**(key: *`Buffer`*, value: *`Buffer`*): `any`

*Defined in [trie/index.ts:39](https://github.com/ethereumjs/sharding/blob/1ee551a/src/trie/index.ts#L39)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Buffer` |
| value | `Buffer` |

**Returns:** `any`

___
<a id="putraw"></a>

###  putRaw

▸ **putRaw**(key: *`Buffer`*, value: *`Buffer`*): `any`

*Defined in [trie/index.ts:44](https://github.com/ethereumjs/sharding/blob/1ee551a/src/trie/index.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Buffer` |
| value | `Buffer` |

**Returns:** `any`

___
<a id="verifyproof"></a>

### `<Static>` verifyProof

▸ **verifyProof**(rootHash: *`Buffer`*, key: *`Buffer`*, proof: *`Buffer`[]*): `any`

*Defined in [trie/index.ts:20](https://github.com/ethereumjs/sharding/blob/1ee551a/src/trie/index.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| rootHash | `Buffer` |
| key | `Buffer` |
| proof | `Buffer`[] |

**Returns:** `any`

___

