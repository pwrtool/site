[@pwrtool/kit](../README.md) / [Modules](../modules.md) / [lib/config](../modules/lib_config.md) / Config

# Class: Config

[lib/config](../modules/lib_config.md).Config

## Table of contents

### Constructors

- [constructor](lib_config.Config.md#constructor)

### Properties

- [values](lib_config.Config.md#values)

### Methods

- [exists](lib_config.Config.md#exists)
- [get](lib_config.Config.md#get)
- [getOrDefault](lib_config.Config.md#getordefault)
- [getOrThrow](lib_config.Config.md#getorthrow)

## Constructors

### constructor

• **new Config**(`cwd`): [`Config`](lib_config.Config.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cwd` | `string` |

#### Returns

[`Config`](lib_config.Config.md)

#### Defined in

[lib/config.ts:10](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/config.ts#L10)

## Properties

### values

• `Private` **values**: `Map`\<`string`, `any`\>

#### Defined in

[lib/config.ts:8](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/config.ts#L8)

## Methods

### exists

▸ **exists**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[lib/config.ts:35](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/config.ts#L35)

___

### get

▸ **get**(`key`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`any`

#### Defined in

[lib/config.ts:39](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/config.ts#L39)

___

### getOrDefault

▸ **getOrDefault**(`key`, `defaultValue`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `defaultValue` | `string` |

#### Returns

`any`

#### Defined in

[lib/config.ts:52](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/config.ts#L52)

___

### getOrThrow

▸ **getOrThrow**(`key`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`any`

#### Defined in

[lib/config.ts:43](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/config.ts#L43)
