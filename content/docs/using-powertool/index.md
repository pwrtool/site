---
title: Using Powertool
---

# Install

## Quick Install

We're still working on a one line install. Stay tuned!

## Manual Install

To run powertool, you'll need [bun](https://github.com/oven-sh/bun). You can install bun with

```bash
curl -fsSL https://bun.sh/install | bash
```

Now clone the repo somewhere convenient. I'll assume that you have git installed. I'll put it in my `/usr/local/powertool` folder:

```bash
sudo git clone https://github.com/pwrtool/powertool.git /usr/local/powertool/
```

You'll then need to add the bin folder to your path. If you put it in your `/usr/local/powertool` folder, that path would be `/usr/local/powertool/bin`. You'll want something like the following inm your `.bashrc`, `.profile`, `.zshrc` or whatever:

```bash
export PATH=$PATH:/usr/local/powertool/bin
```

Now ensure that the installation worked properly:

```bash
pwrtool --help
```

This should display a help message that looks like the following:

```txt
Usage: pwrtool [options] [command]

Automate every aspect of your workflow

Options:
  -V, --version    output the version number
  -h, --help       display help for command

Commands:
  install <kit>    Install a tool from Github to your system
  update <kit>     uninstalls and reinstalls a kit to ensure it is up to date
  uninstall <kit>  Uninstall a tool from your system
  test-install     Installs ./install.sh as a kit to the test-kit directory. You can then run
                   `ptx bench/test <tool>` to test your kit. This is primarily useful for
                   developing kits
  info <kit>       Get information about a kit from its ptinfo.yaml file
```

# Downloading Kits
