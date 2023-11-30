[@pwrtool/kit](../README.md) / [Modules](../modules.md) / [lib/kit](../modules/lib_kit.md) / Kit

# Class: Kit

[lib/kit](../modules/lib_kit.md).Kit

handles adding and running tools. Everything does what you'd think.

## Table of contents

### Constructors

- [constructor](lib_kit.Kit.md#constructor)

### Properties

- [IO](lib_kit.Kit.md#io)
- [args](lib_kit.Kit.md#args)
- [config](lib_kit.Kit.md#config)
- [tools](lib_kit.Kit.md#tools)

### Methods

- [addTool](lib_kit.Kit.md#addtool)
- [runTool](lib_kit.Kit.md#runtool)

## Constructors

### constructor

• **new Kit**(`IO`, `args`, `config`): [`Kit`](lib_kit.Kit.md)

#### Parameters

| Name     | Type                             |
| :------- | :------------------------------- |
| `IO`     | [`IO`](lib_io.IO.md)             |
| `args`   | [`CLIArgs`](lib_cli.CLIArgs.md)  |
| `config` | [`Config`](lib_config.Config.md) |

#### Returns

[`Kit`](lib_kit.Kit.md)

#### Defined in

[lib/kit.ts:28](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/kit.ts#L28)

## Properties

### IO

• `Private` **IO**: [`IO`](lib_io.IO.md)

#### Defined in

[lib/kit.ts:24](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/kit.ts#L24)

---

### args

• `Private` **args**: [`CLIArgs`](lib_cli.CLIArgs.md)

#### Defined in

[lib/kit.ts:26](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/kit.ts#L26)

---

### config

• `Private` **config**: [`Config`](lib_config.Config.md)

#### Defined in

[lib/kit.ts:25](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/kit.ts#L25)

---

### tools

• **tools**: [`Tool`](../interfaces/lib_kit.Tool.md)[] = `[]`

#### Defined in

[lib/kit.ts:23](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/kit.ts#L23)

## Methods

### addTool

▸ **addTool**(`tool`): `void`

#### Parameters

| Name   | Type                                    |
| :----- | :-------------------------------------- |
| `tool` | [`Tool`](../interfaces/lib_kit.Tool.md) |

#### Returns

`void`

#### Defined in

[lib/kit.ts:34](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/kit.ts#L34)

---

### runTool

▸ **runTool**(`toolName`): `void`

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `toolName` | `string` |

#### Returns

`void`

#### Defined in

[lib/kit.ts:49](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/kit.ts#L49)
