---
title: Creating Kits
---

This page will take you through the basics of what a kit is, how it works, and how you can build one.

# What are Kits?

At it's core, a kit is just two files:

- `run.sh`
- `install.sh`

The `install.sh` script is run when the kit is installed, and the `run.sh` script is run to run the kit. If all you need is a simple shell script with no args, then nothing beyond here is necessary!

# How are kits called?

When you call `pwrtool run <kit>` to run a kit, the following command is run on your computer:

`<path-to-your-run.sh-script>`
