[@pwrtool/kit](../README.md) / [Modules](../modules.md) / [lib/io](../modules/lib_io.md) / Questioner

# Class: Questioner

[lib/io](../modules/lib_io.md).Questioner

## Hierarchy

- **`Questioner`**

  ↳ [`ConsoleQuestioner`](lib_io.ConsoleQuestioner.md)

  ↳ [`FakeQuestioner`](lib_io.FakeQuestioner.md)

## Table of contents

### Constructors

- [constructor](lib_io.Questioner.md#constructor)

### Methods

- [dichotomous](lib_io.Questioner.md#dichotomous)
- [prompt](lib_io.Questioner.md#prompt)

## Constructors

### constructor

• **new Questioner**(): [`Questioner`](lib_io.Questioner.md)

#### Returns

[`Questioner`](lib_io.Questioner.md)

## Methods

### dichotomous

▸ **dichotomous**(`question`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `question` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[lib/io.ts:104](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L104)

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

[lib/io.ts:103](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L103)
