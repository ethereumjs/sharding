[sharding](../README.md) > [merkle](../modules/merkle.md) > [Node](../classes/merkle.node.md)

# Class: Node

## Hierarchy

**Node**

## Index

### Constructors

* [constructor](merkle.node.md#constructor)

### Properties

* [children](merkle.node.md#children)
* [parent](merkle.node.md#parent)
* [value](merkle.node.md#value)

### Methods

* [getPosition](merkle.node.md#getposition)
* [getSibling](merkle.node.md#getsibling)
* [isLeaf](merkle.node.md#isleaf)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Node**(value: *`Buffer`*, children?: *[Node](merkle.node.md)[]*): [Node](merkle.node.md)

*Defined in [merkle/node.ts:7](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/merkle/node.ts#L7)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| value | `Buffer` | - |
| `Default value` children | [Node](merkle.node.md)[] |  [] |

**Returns:** [Node](merkle.node.md)

___

## Properties

<a id="children"></a>

###  children

**● children**: *[Node](merkle.node.md)[]*

*Defined in [merkle/node.ts:6](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/merkle/node.ts#L6)*

___
<a id="parent"></a>

###  parent

**● parent**: *[Node](merkle.node.md) \| `null`*

*Defined in [merkle/node.ts:7](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/merkle/node.ts#L7)*

___
<a id="value"></a>

###  value

**● value**: *`Buffer`*

*Defined in [merkle/node.ts:5](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/merkle/node.ts#L5)*

___

## Methods

<a id="getposition"></a>

###  getPosition

▸ **getPosition**(): "left" \| "right"

*Defined in [merkle/node.ts:31](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/merkle/node.ts#L31)*

**Returns:** "left" \| "right"

___
<a id="getsibling"></a>

###  getSibling

▸ **getSibling**(): [Node](merkle.node.md)

*Defined in [merkle/node.ts:19](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/merkle/node.ts#L19)*

**Returns:** [Node](merkle.node.md)

___
<a id="isleaf"></a>

###  isLeaf

▸ **isLeaf**(): `boolean`

*Defined in [merkle/node.ts:15](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/merkle/node.ts#L15)*

**Returns:** `boolean`

___

