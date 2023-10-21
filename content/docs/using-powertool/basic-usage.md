---
title: "Basic Usage"
weight: 500
# bookFlatSection: false
# bookToc: true
# bookHidden: false
# bookCollapseSection: false
# bookComments: false
# bookSearchExclude: false
---

# Kit management

## Installing kits

Kits are just github repos. They can be installed like such:

```bash
pwrtool install <user>/<their-kit>
```

Kits are always installed from whatever the default git branch is (typically `master` or `main`). If you're working on a kit, it's recommended to keep a `develop` branch open for "working changes" that makes PR's to the main branch for new versions.

## Uninstalling kits

To uninstall a kit, just use the uninstall command:

```bash
pwrtool uninstall <user>/<their-kit>
```

This will remove the kit from your system

## Updating kits

Powertool has a mechanism for updating kits to whatever their latest commit is.

```bash
pwrtool update <user>/<their-kit>
```

Under the hood, this just uninstalls and reinstalls the kit. Simply pulling the changes from github wouldn't work in case of a breaking change in the `install.sh` script.

## Information

Kits can provide a `.ptinfo.json` file that powertool reads to proivde a "help screen."

```bash
pwrtool info <user>/<their-kit>
```

## Test install

More detail is given to this command in the section on building kits. It doesn't really matter if you're not actually building kits with powertool.

```bash
pwrtool
```

All it does is install the cwd as a kit under the `bench/test` kit. This creates a weird situation where the github user named "bench" cannot create a kit named "test." Sorry [Benjamin Chenebault](https://github.com/bench).

# Running tools

Running tools is done with the separate `ptx` command (short for "powertool execute").

```bash
ptx <user>/<their-kit> <tool>
```

Here's an example where we run the `hello-world` tool in the std kit:

```bash
ptx pwrtool/std hello-world
```

You can also provide arguments to your tool:

```bash
ptx pwrtool/std hello-world myarg=myval
```

For this to work properly, your value cannot have spaces. Any input that requires a string with spaces should probably be done with a `prompt`.

# Action Files

**Not implemented**

You can also run an action file:

```bash
ptx action ./my-action-file
```
