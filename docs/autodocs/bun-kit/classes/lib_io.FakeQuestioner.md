[@pwrtool/kit](../README.md) / [Modules](../modules.md) / [lib/io](../modules/lib_io.md) / FakeQuestioner

# Class: FakeQuestioner

[lib/io](../modules/lib_io.md).FakeQuestioner

## Hierarchy

- [`Questioner`](lib_io.Questioner.md)

  ↳ **`FakeQuestioner`**

## Table of contents

### Constructors

- [constructor](lib_io.FakeQuestioner.md#constructor)

### Properties

- [answers](lib_io.FakeQuestioner.md#answers)

### Methods

- [dichotomous](lib_io.FakeQuestioner.md#dichotomous)
- [prompt](lib_io.FakeQuestioner.md#prompt)

## Constructors

### constructor

• **new FakeQuestioner**(`answers`): [`FakeQuestioner`](lib_io.FakeQuestioner.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `answers` | `string`[] |

#### Returns

[`FakeQuestioner`](lib_io.FakeQuestioner.md)

#### Overrides

[Questioner](lib_io.Questioner.md).[constructor](lib_io.Questioner.md#constructor)

#### Defined in

[lib/io.ts:143](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L143)

## Properties

### answers

• `Private` **answers**: `string`[]

#### Defined in

[lib/io.ts:142](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L142)

## Methods

### dichotomous

▸ **dichotomous**(`_question`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_question` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[Questioner](lib_io.Questioner.md).[dichotomous](lib_io.Questioner.md#dichotomous)

#### Defined in

[lib/io.ts:152](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L152)

___

### prompt

▸ **prompt**(`_question`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_question` | `string` |

#### Returns

`Promise`\<`string`\>

#### Overrides

[Questioner](lib_io.Questioner.md).[prompt](lib_io.Questioner.md#prompt)

#### Defined in

[lib/io.ts:148](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/io.ts#L148)
