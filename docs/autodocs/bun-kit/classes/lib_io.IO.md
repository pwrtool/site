[@pwrtool/kit](../README.md) / [Modules](../modules.md) / [lib/io](../modules/lib_io.md) / IO

# Class: IO

[lib/io](../modules/lib_io.md).IO

## Table of contents

### Constructors

- [constructor](lib_io.IO.md#constructor)

### Properties

- [questioner](lib_io.IO.md#questioner)

### Methods

- [bold](lib_io.IO.md#bold)
- [dichotomous](lib_io.IO.md#dichotomous)
- [error](lib_io.IO.md#error)
- [header](lib_io.IO.md#header)
- [info](lib_io.IO.md#info)
- [out](lib_io.IO.md#out)
- [outToScratch](lib_io.IO.md#outtoscratch)
- [prompt](lib_io.IO.md#prompt)
- [success](lib_io.IO.md#success)
- [underlined](lib_io.IO.md#underlined)
- [warn](lib_io.IO.md#warn)

## Constructors

### constructor

• **new IO**(`questioner`): [`IO`](lib_io.IO.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `questioner` | [`Questioner`](lib_io.Questioner.md) |

#### Returns

[`IO`](lib_io.IO.md)

#### Defined in

[lib/io.ts:8](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L8)

## Properties

### questioner

• `Private` **questioner**: [`Questioner`](lib_io.Questioner.md)

#### Defined in

[lib/io.ts:6](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L6)

## Methods

### bold

▸ **bold**(`message`): `void`

Outputs a message to the console in bold text

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message to output |

#### Returns

`void`

void

#### Defined in

[lib/io.ts:62](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L62)

___

### dichotomous

▸ **dichotomous**(`question`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `question` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[lib/io.ts:16](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L16)

___

### error

▸ **error**(`message`): `void`

Outputs a message to the console in red and bold text

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message to output |

#### Returns

`void`

void

#### Defined in

[lib/io.ts:97](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L97)

___

### header

▸ **header**(`message`): `void`

Outputs a message to the console in bold blue text with an underline

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message to output |

#### Returns

`void`

void

#### Defined in

[lib/io.ts:88](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L88)

___

### info

▸ **info**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[lib/io.ts:70](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L70)

___

### out

▸ **out**(`message`): `void`

Outputs a message to the console

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message to output |

#### Returns

`void`

void

#### Defined in

[lib/io.ts:44](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L44)

___

### outToScratch

▸ **outToScratch**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `object` |

#### Returns

`void`

#### Defined in

[lib/io.ts:32](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L32)

___

### prompt

▸ **prompt**(`question`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `question` | `string` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[lib/io.ts:12](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L12)

___

### success

▸ **success**(`message`): `void`

Outputs a message to the console in green and bold text

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message to output |

#### Returns

`void`

void

#### Defined in

[lib/io.ts:53](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L53)

___

### underlined

▸ **underlined**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[lib/io.ts:66](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L66)

___

### warn

▸ **warn**(`message`): `void`

Outputs a message to the console in yellow and bold text

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message to output |

#### Returns

`void`

void

#### Defined in

[lib/io.ts:79](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L79)
