---
title: "Install"
weight: 250
# bookFlatSection: false
# bookToc: true
# bookHidden: false
# bookCollapseSection: false
# bookComments: false
# bookSearchExclude: false
---

# Install

Powertool is only available for linux and macos. Windows users can use WSL. It's assumed that you already have git installed.

First, make sure you have bun installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

Then, clone powertool to your /usr/local/ folder (or anywhere else):

```bash
sudo git clone https://github.com/pwrtool/powertool.git /usr/local/powertool
```

Finally, add powertool to your path. This probably involves adding something like:

```bash
export PATH=$PATH:/usr/local/pwrtool/bin
```

to your `~/.bashrc`, `~/.profile`, or `~/.zshrc`.

# Setup

It's recommended that you install the std kit. Run:

```bash
pwrtool install pwrtool/std
```

This will give you access to kit templates and basic testing utilities.
