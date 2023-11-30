[@pwrtool/kit](../README.md) / [Modules](../modules.md) / [lib/io](../modules/lib_io.md) / ConsoleQuestioner

# Class: ConsoleQuestioner

[lib/io](../modules/lib_io.md).ConsoleQuestioner

## Hierarchy

- [`Questioner`](lib_io.Questioner.md)

  ↳ **`ConsoleQuestioner`**

## Table of contents

### Constructors

- [constructor](lib_io.ConsoleQuestioner.md#constructor)

### Methods

- [dichotomous](lib_io.ConsoleQuestioner.md#dichotomous)
- [prompt](lib_io.ConsoleQuestioner.md#prompt)

## Constructors

### constructor

• **new ConsoleQuestioner**(): [`ConsoleQuestioner`](lib_io.ConsoleQuestioner.md)

#### Returns

[`ConsoleQuestioner`](lib_io.ConsoleQuestioner.md)

#### Inherited from

[Questioner](lib_io.Questioner.md).[constructor](lib_io.Questioner.md#constructor)

## Methods

### dichotomous

▸ **dichotomous**(`question`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `question` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[Questioner](lib_io.Questioner.md).[dichotomous](lib_io.Questioner.md#dichotomous)

#### Defined in

[lib/io.ts:124](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L124)

___

### prompt

▸ **prompt**(`question`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `question` | `string` |

#### Returns

`Promise`\<`string`\>

#### Overrides

[Questioner](lib_io.Questioner.md).[prompt](lib_io.Questioner.md#prompt)

#### Defined in

[lib/io.ts:108](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L108)
