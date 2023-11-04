# Prerequisites

I'm going to assume that:

- You know typescript reasonably well
- You have powertool and the std kit installed
- You are on linux or MacOS
- You are at least an intermediate level programmer. I'm not going to be explaining any of the basic stuff

# What are we building?

Let's build a kit that parses a bunch of markdown files into JSON for use in a static site generator. For example, lets say we have the filetree:

```
content/
  docs/
    getting-started/
      index.mdx
      installation.mdx
      usage.mdx
    building-kits/
      index.mdx
      using-action-files.mdx
      bun/
        index.mdx
        api.mdx
     ...
  posts/
    release-1.0.md
    release-2.0.mdx
```

We should output something that looks like:

```
public/
  genreated-content/
    list.json
    content.json
```

The `list.json` file should be:

```json
[
    {
        "route": "docs/getting-started"
        "frontmatter": {
            "title": "Getting Started",
            "author": "Jonathan Deiss",
            "weight": 100
        },
        "outline": [
            {
                "type": "h1",
                "text": "My first header"
            },
            {
                "type": "h2",
                "text": "Another header"
            },
            ...
        ]
    },
    {
        "route": "docs/getting-started/installation",
        "frontmatter": "..."
        "outline": "..."
    },
    {
        "route": "posts/release-1.0",
        "frontmatter": "...",
        "outline": "..."
    },
    ...
]
```

For every markdown file there should be an entry in the `list.json` file containing the route it should be served at, an outline for the file (based on its headers), and the frontmatter in the markdown file. The `content.json` file has the same thing has the `list.json` file, but also contains an extra `content` field, which contains the raw content in the file. It's split into two different files, because something like a navbar would only care about the metadata and where to link to for each route, so there's no point in storing all of the data about content.

In the future, it may be beneficial to split the `content.json` file into multiple files to avoid overfetching for every single route. I'm not going to do that in this tutorial, since I'm assuming:

1. If you had a lot of content, you'd use a more complex solution such as hugo
2. You're using something like next.js which caches fetch calls so it really doesn't matter that much

If it's too slow for the purposes of the powertool documentation (Which you're reading right now!), I'll change it later.

### A note on frontmatter

If you're unfamiliar with frontmatter, it's a way to define metadata on a markdown file using YAML. Take the following markdown file as an example:

```md
---
title: An example of frontmatter
author: Someone Cool
date: 5/5/2125
---

# Rest of the article

lorem ipsum
```

The frontmatter for this in json would be:

```json
{
  "title": "An example of frontmatter",
  "author": "Someone Cool",
  "date": "5/5/2125"
}
```

# Creating the project

To create the project, we'll first create an empty repo. I prefer to do this with the github CLI, but you can do what you want. I'll call this repo "Simple Content Layer" (If you're wondering, I am writing this article while building the actual repo Simple Content Layer). Once inside the folder, I'll run `ptx pwrtool/std new-kit` to create the new kit, and open it in my editor.

```bash
gh repo create
cd simple-content-layer
ptx pwrtool/std new-kit
bun install
nvim .
```

For this tutorial, we won't be doing anything fancy with the `run.sh` script or `install.sh` script. They aren't executables by default though, so make sure to run:

```bash
chmod +x run.sh
chmod +x install.sh
```

Now let's make sure that the default hello world is working. Run the command `ptx pwrtool/std test-run`. If you answer the first question with "default", you should see output that looks like:

```txt
Running the test-run tool from pwrtool/std
🔍 Searching for local install.sh
📂 Using kit directory: /home/firesquid/source/simple-content-layer
✅️ Found install.sh file

📜 Running install script in /home/firesquid/source/simple-content-layer
bun install v1.0.8 (2a405f69)

Checked 4 installs across 5 packages (no changes) [1.00ms]
✅️ No errors found in install script!
Run `ptx bench/test <tool>` to test your kit

What tool do you want to run?
default

Running default from bench/test:
Hello world!
Tool finished successfully.
```

# Getting our Inputs

## Plan

We'll need two inputs from the user:

1. Where are your markdown files?
2. Where do you want the crap to go?

To get this, we'll ask in two different ways:

1. If the user provided a CLI arg, we'll just go with that
2. If no CLI arg was provided, check the config file
3. If neither of those two work, we'll just throw an error

### Why not ask a question if the first two fail?

I'm building this under the assumption that it will be used in CI pipelines. Since you can't answer questions there, it's better to just throw an error. Questions are best used when the following conditions are true:

1. A human will always be running the tool (questions are automatable but painful)
2. The input is long or complex
3. The input is part of a sequential chain

## Code

To get these inputs, we'll use the following code for `index.ts`:

```ts
import powertool from "@pwrtool/kit";

powertool([
  {
    name: "default",
    function: async (IO, CliArgs, Config) => {
      const argsKeys = ["input", "output"];
      const argValues = [];

      for (const key of argsKeys) {
        if (CliArgs.exists(key)) {
          argValues.push(CliArgs.get(key));
          continue;
        }
        if (Config.exists(key)) {
          argValues.push(Config.get(key));
          continue;
        }

        IO.error(`${key} could not be found in cli args or config`);
        break;
      }

      const [input, output] = argValues;
      IO.out(`input: ${input}`);
      IO.out(`output: ${output}`);
    },
  },
]);
```

Now let's test and see if it works. If I run `ptx pwrtool/std test-run input=hello output=world`, the output I get is:

```txt
intput: hello
output: world
```

If I don't provide anything, I get the output:

```txt
input could not be found in cli args or config
input: undefined
output: undefined
```

If I create a `ptconfig.yaml` file in the cwd that looks like:

```yaml
---
input: hello
output: world
```

I can now get the good output without providing anything
