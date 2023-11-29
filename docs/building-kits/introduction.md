---
sidebar-position: 1
title: Introduction
description: An conceptual introduction to building kits
---

This page will take you through the basics of what a kit is, how it works, and how you can build one.

# What are Kits?

At it's core, a kit is just two files:

```bash
    run.sh
    install.sh
```

The install.sh script is run when the kit is installed, and the run.sh script is run to run the kit. If all you need is a simple shell script with no args, then nothing beyond here is necessary!

# How are kits called?

When you call pwrtool run `<kit>` to run a kit, the following command is run on your computer:

```txt
<path-to-your-run.sh-script>
```

# What you can assume when building kits

You can assume the following about the consumer of your kit:

- They have the powertool cli installed
- They have git installed
- They have bun installed
- They are on a unix machine (Mac, Linux, WSL, or other stuff)

Try to minimize your dependencies if possible. If you use any other dependenices in building a kit it is your job to make sure they get installed in the `install.sh` script.
