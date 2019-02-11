[sharding](../README.md) > [db](../modules/db.md) > [DB](../classes/db.db-1.md)

# Class: DB

## Hierarchy

**DB**

## Index

### Constructors

* [constructor](db.db-1.md#constructor)

### Properties

* [_db](db.db-1.md#_db)

### Methods

* [del](db.db-1.md#del)
* [get](db.db-1.md#get)
* [put](db.db-1.md#put)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new DB**(): [DB](db.db-1.md)

*Defined in [db/index.ts:5](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/db/index.ts#L5)*

**Returns:** [DB](db.db-1.md)

___

## Properties

<a id="_db"></a>

###  _db

**● _db**: *`Map`<`string`, `Buffer`>*

*Defined in [db/index.ts:5](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/db/index.ts#L5)*

___

## Methods

<a id="del"></a>

###  del

▸ **del**(key: *`Buffer`*): `boolean`

*Defined in [db/index.ts:19](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/db/index.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Buffer` |

**Returns:** `boolean`

___
<a id="get"></a>

###  get

▸ **get**(key: *`Buffer`*): `Buffer` \| `undefined`

*Defined in [db/index.ts:15](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/db/index.ts#L15)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Buffer` |

**Returns:** `Buffer` \| `undefined`

___
<a id="put"></a>

###  put

▸ **put**(key: *`Buffer`*, value: *`Buffer`*): `void`

*Defined in [db/index.ts:11](https://github.com/ethereumjs/sharding/blob/77a3ca9/src/db/index.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Buffer` |
| value | `Buffer` |

**Returns:** `void`

___

