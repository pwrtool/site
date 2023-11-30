[@pwrtool/kit](../README.md) / [Modules](../modules.md) / lib/kit

# Module: lib/kit

## Table of contents

### Classes

- [Kit](../classes/lib_kit.Kit.md)

### Interfaces

- [Tool](../interfaces/lib_kit.Tool.md)

### Functions

- [findRunstring](lib_kit.md#findrunstring)
- [powertool](lib_kit.md#powertool)

## Functions

### findRunstring

▸ **findRunstring**(): `ParsedRunstring`

Gets the runstring from the command line arguments and parses it. Throws an error if it fails

#### Returns

`ParsedRunstring`

#### Defined in

[lib/kit.ts:98](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/kit.ts#L98)

___

### powertool

▸ **powertool**(`tools`, `runstring?`): `void`

Creates a kit, adds tools to it, and runs it based on the runstring.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tools` | [`Tool`](../interfaces/lib_kit.Tool.md)[] | `undefined` | An array of tools to add to the kit. |
| `runstring` | `undefined` \| `ParsedRunstring` | `undefined` | The runstring to run the kit with. Finds the runstring from cli args if not provided |

#### Returns

`void`

#### Defined in

[lib/kit.ts:67](https://github.com/pwrtool/kits/blob/00eb7bf/bun/lib/kit.ts#L67)
