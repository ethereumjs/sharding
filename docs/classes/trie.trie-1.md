[sharding](../README.md) > [trie](../modules/trie.md) > [Trie](../classes/trie.trie-1.md)

# Class: Trie

## Hierarchy

**Trie**

## Index

### Constructors

* [constructor](trie.trie-1.md#constructor)

### Properties

* [wrapped](trie.trie-1.md#wrapped)

### Methods

* [get](trie.trie-1.md#get)
* [put](trie.trie-1.md#put)
* [putRaw](trie.trie-1.md#putraw)
* [prove](trie.trie-1.md#prove)
* [verifyProof](trie.trie-1.md#verifyproof)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Trie**(wrapped?: *`any`*): [Trie](trie.trie-1.md)

*Defined in [trie/index.ts:10](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/trie/index.ts#L10)*

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

*Defined in [trie/index.ts:10](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/trie/index.ts#L10)*

___

## Methods

<a id="get"></a>

###  get

▸ **get**(key: *`Buffer`*): `any`

*Defined in [trie/index.ts:30](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/trie/index.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Buffer` |

**Returns:** `any`

___
<a id="put"></a>

###  put

▸ **put**(key: *`Buffer`*, value: *`Buffer`*): `any`

*Defined in [trie/index.ts:35](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/trie/index.ts#L35)*

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

*Defined in [trie/index.ts:40](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/trie/index.ts#L40)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Buffer` |
| value | `Buffer` |

**Returns:** `any`

___
<a id="prove"></a>

### `<Static>` prove

▸ **prove**(trie: *`any`*, key: *`Buffer`*): `any`

*Defined in [trie/index.ts:16](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/trie/index.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| trie | `any` |
| key | `Buffer` |

**Returns:** `any`

___
<a id="verifyproof"></a>

### `<Static>` verifyProof

▸ **verifyProof**(rootHash: *`Buffer`*, key: *`Buffer`*, proof: *`any`*): `any`

*Defined in [trie/index.ts:24](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/trie/index.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| rootHash | `Buffer` |
| key | `Buffer` |
| proof | `any` |

**Returns:** `any`

___

