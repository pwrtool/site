---
title: ptinfo.json
weight: 500
---

# ptinfo.json

The `ptinfo.json` file is how the powertool cli knows what your kit does. It is structured as such:

```json
{
    "ptinfov": 1,
    "name": "My-awesome-kit",
    "author": "a-cool-person",
    "version": "1.0.0",
    "description": "A cool kit for doing cool things",
    "link": "https://github.com/me/My-awesome-kit",
    "tools": [
        {
            "name": "tool-1",
            "description": "An awesome tool",
            "expected-args": [
                {
                    "arg": "name-of-arg",
                    "description": "why this arg is neccessary"
                }
            ],
            "questions": true
        },
        ...
    ],
    "expectedConfigValues": [
        {
            "key": "name-of-config-key",
            "description": "This config key is neccessary because it is awesome",
            "default": "the default value of the config if it isn't found"
        },
        ...
    ]
}
```

It isn't required to include one of these with your kits, but the `pwrtool info you/yourkit` command will not work without it.

# Properties

- `ptinfov` - the version of the ptconfig.json file. This is just for future proofing, and you can most likely just use whatever number is in this doc file.
- `name` - the name of your kit. Has no spaces.
- `author` - the author of your kit. Has no spaces.
- `version` - the version of your kit. This may be used in the future to make an auto updating system.
- `description` - a concise description of your kit. Try to limit yourself to 300 characters. You can give a full description in your README
- `link` - some sort of link for your kit. This should probably just be your github page, but if your kit is complex enough you may have a docs site.
- `tools` - should have one entry for each tool in your kit. Each entry contains the following:
  - `name` - the name of your tool. For the default tool, you can just use "default"
  - `description` - a concise description of your tool. Follow the same ruls as the description for the kit
  - `expected-args` - a list of expected command line args:
    - `arg` - the name of the arg
    - `description` - a description of the arg and its possible values
  - `has-questions` - a boolean on whether your tool asks questions to the terminal or not
- `expectedConfigvalues` - A list of config values your kit expects in the `.config/pwrtool/config.json` file.
  - `key` - the name of the config value
  - `description` - a description of the possible values for the config and what it changes
  - `default` - the default value for the config.
