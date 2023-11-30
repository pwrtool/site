---
sidebar_position: 1
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
/the/path/to/your/run.sh <a runstring>
```

## Wait what's this runstring thing

The runstring is how powertool provides info to your kit on what it's doing. It's just a json string with the following typescript type:

```ts
interface ParsedRunstring {
  tool: string;
  from: string;
  arguments: Map<string, string>;
  autoAnswer: boolean;
  answers: string[];
}
```

The properties in the runstring describe:

- tool - the tool being run from your kit
- from - the directory where your kit was called
- arguments - a map of arguments passed as strings. It's on you to parse those into whatever they need to be.
- autoAnswer - a boolean telling you if you can ask questions to the user. If it's true, the user is trying to automate your kit and you should respect that by using answers from the answers array
- answers - a list of answers to command line questions

More info on the `autoAnswer` and `answers` is given in the section for contributors about building your own kit package.

If you're using a package for your language or framework to build your kit, you probably won't have to worry about runstrings. The documentation for that package should tell you how to access the information provided by it.

# What you can assume when building kits

You can assume the following about the consumer of your kit:

- They have the powertool cli installed
- They have git installed
- They have bun installed
- They are on a unix machine (Mac, Linux, WSL, or other stuff)

Try to minimize your dependencies if possible. If you use any other dependenices in building a kit it is your job to make sure they get installed in the `install.sh` script.
