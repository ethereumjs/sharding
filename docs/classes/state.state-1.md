[sharding](../README.md) > [state](../modules/state.md) > [State](../classes/state.state-1.md)

# Class: State

## Hierarchy

**State**

## Index

### Constructors

* [constructor](state.state-1.md#constructor)

### Properties

* [wrapped](state.state-1.md#wrapped)

### Methods

* [flush](state.state-1.md#flush)
* [getAccount](state.state-1.md#getaccount)
* [getStateRoot](state.state-1.md#getstateroot)
* [putAccount](state.state-1.md#putaccount)
* [fromTrie](state.state-1.md#fromtrie)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new State**(wrapped?: *`any`*): [State](state.state-1.md)

*Defined in [state/index.ts:10](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/state/index.ts#L10)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` wrapped | `any` |  new StateManager() |

**Returns:** [State](state.state-1.md)

___

## Properties

<a id="wrapped"></a>

###  wrapped

**● wrapped**: *`any`*

*Defined in [state/index.ts:10](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/state/index.ts#L10)*

___

## Methods

<a id="flush"></a>

###  flush

▸ **flush**(): `any`

*Defined in [state/index.ts:36](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/state/index.ts#L36)*

**Returns:** `any`

___
<a id="getaccount"></a>

###  getAccount

▸ **getAccount**(address: *`Buffer`*): `any`

*Defined in [state/index.ts:21](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/state/index.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| address | `Buffer` |

**Returns:** `any`

___
<a id="getstateroot"></a>

###  getStateRoot

▸ **getStateRoot**(): `any`

*Defined in [state/index.ts:31](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/state/index.ts#L31)*

**Returns:** `any`

___
<a id="putaccount"></a>

###  putAccount

▸ **putAccount**(address: *`Buffer`*, account: *`Account`*): `any`

*Defined in [state/index.ts:26](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/state/index.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| address | `Buffer` |
| account | `Account` |

**Returns:** `any`

___
<a id="fromtrie"></a>

### `<Static>` fromTrie

▸ **fromTrie**(trie: *[Trie](trie.trie-1.md)*): [State](state.state-1.md)

*Defined in [state/index.ts:16](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/state/index.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| trie | [Trie](trie.trie-1.md) |

**Returns:** [State](state.state-1.md)

___

