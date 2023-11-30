[@pwrtool/kit](../README.md) / [Modules](../modules.md) / [lib/cli](../modules/lib_cli.md) / CLIArgs

# Class: CLIArgs

[lib/cli](../modules/lib_cli.md).CLIArgs

Wraps the map containing the arguments provided to the tool in the CLI

## Table of contents

### Constructors

- [constructor](lib_cli.CLIArgs.md#constructor)

### Properties

- [args](lib_cli.CLIArgs.md#args)
- [runDir](lib_cli.CLIArgs.md#rundir)

### Methods

- [exists](lib_cli.CLIArgs.md#exists)
- [get](lib_cli.CLIArgs.md#get)
- [getOrDefault](lib_cli.CLIArgs.md#getordefault)
- [getOrThrow](lib_cli.CLIArgs.md#getorthrow)
- [getRunDir](lib_cli.CLIArgs.md#getrundir)

## Constructors

### constructor

• **new CLIArgs**(`parsedRunstring`): [`CLIArgs`](lib_cli.CLIArgs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parsedRunstring` | `ParsedRunstring` |

#### Returns

[`CLIArgs`](lib_cli.CLIArgs.md)

#### Defined in

[lib/cli.ts:9](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/cli.ts#L9)

## Properties

### args

• `Private` **args**: `Map`\<`string`, `string`\>

#### Defined in

[lib/cli.ts:6](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/cli.ts#L6)

___

### runDir

• `Private` **runDir**: `string` = `""`

#### Defined in

[lib/cli.ts:7](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/cli.ts#L7)

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

[lib/cli.ts:18](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/cli.ts#L18)

___

### get

▸ **get**(`key`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| `string`

#### Defined in

[lib/cli.ts:14](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/cli.ts#L14)

___

### getOrDefault

▸ **getOrDefault**(`key`, `defaultValue`): `string`

Gets a value. If that value is not found, it returns the default value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `defaultValue` | `string` |

#### Returns

`string`

The value of the argument, or the default value if the argument is not found

#### Defined in

[lib/cli.ts:42](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/cli.ts#L42)

___

### getOrThrow

▸ **getOrThrow**(`key`): `string`

Gets a value. If that value is not found, it throws an error.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

The value of the argument

#### Defined in

[lib/cli.ts:27](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/cli.ts#L27)

___

### getRunDir

▸ **getRunDir**(): `string`

Gets the run directory. If it is not provided, it returns the current working directory.

#### Returns

`string`

#### Defined in

[lib/cli.ts:50](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/cli.ts#L50)
