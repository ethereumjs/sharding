[sharding](../README.md) > [vm](../modules/vm.md) > [VM](../classes/vm.vm-1.md)

# Class: VM

## Hierarchy

**VM**

## Index

### Constructors

* [constructor](vm.vm-1.md#constructor)

### Properties

* [wrapped](vm.vm-1.md#wrapped)

### Methods

* [runTx](vm.vm-1.md#runtx)
* [fromState](vm.vm-1.md#fromstate)
* [fromTrie](vm.vm-1.md#fromtrie)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new VM**(wrapped?: *`any`*): [VM](vm.vm-1.md)

*Defined in [vm/index.ts:10](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/vm/index.ts#L10)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` wrapped | `any` |  new VM() |

**Returns:** [VM](vm.vm-1.md)

___

## Properties

<a id="wrapped"></a>

###  wrapped

**● wrapped**: *`any`*

*Defined in [vm/index.ts:10](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/vm/index.ts#L10)*

___

## Methods

<a id="runtx"></a>

###  runTx

▸ **runTx**(tx: *`any`*): `any`

*Defined in [vm/index.ts:26](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/vm/index.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tx | `any` |

**Returns:** `any`

___
<a id="fromstate"></a>

### `<Static>` fromState

▸ **fromState**(state: *[State](state.state-1.md)*): [VM](vm.vm-1.md)

*Defined in [vm/index.ts:16](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/vm/index.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [State](state.state-1.md) |

**Returns:** [VM](vm.vm-1.md)

___
<a id="fromtrie"></a>

### `<Static>` fromTrie

▸ **fromTrie**(trie: *[Trie](trie.trie-1.md)*): [VM](vm.vm-1.md)

*Defined in [vm/index.ts:21](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/vm/index.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| trie | [Trie](trie.trie-1.md) |

**Returns:** [VM](vm.vm-1.md)

___

