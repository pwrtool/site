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
    getting-started.json
    getting-started>installation.json
    getting-started>usage.json
    building-kits.json
    building-kits>using-action-files.json
    building-kits>bun.json
    building-kits>bun>api.json
    posts>release-1.0.json
    posts>release-2.0.json
    ...
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

It's useful for building something like a sidebar which needs to know about each route, but not the actual content.

All of the other files are the actual data on each route. It should look something like:

```json
{
    "frontmatter": {
        "title": "Something"
        ...
    },
    "outline": [
        ...
    ],
    "content": "this is the raw content in text for the file\n. It could be very long, which is why we split it into multiple files.\n"
}
```

It's basically the same as the entries for list.json, but also contains the content field for the actual raw content in each markdown file. It's the burden of the consumer of this tool to parse that content into HTML. At the end, I'll demo how to do that using Next.js and it's MDX renderer.

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

I can now get the "correct" output without providing anything

# Parsing a markdown file

As a general rule, the code for each tool inside of `index.ts` should only do:

1. parse the inputs
2. run some function to do whatever thing you're doing
3. give an output based on the result of #2

If the tool is very simple, you can just put the actual logic for it in the `index.ts` file, but for anything complex (anything greater than around 50 lines) it's recommended you create a `lib/` folder and write some tests.

## Reading from the filesystem

We're going to use a technique called dependnecy injection to deal with reading and wring to the filesystem. To do this, create the `lib/filesystem.ts` file.

In this file, create the `Filesystem` interface:

```ts
export interface Filesystem {
  files: string[];
  read(filepath: string): string | null;
  exists(filepath: string): boolean;
}
```

There's no write function since we won't need it.

We'll then wrap the `fs` package using this interface and create a class called `LocalDirectory`:

```ts
export class LocalDirectory implements Filesystem {
  files: string[] = [];

  constructor(directory: string) {
    this.files = recursivelyReadDir(directory);
  }

  read(filepath: string): string | null {
    if (fs.existsSync(filepath)) {
      console.log("exists");
      return fs.readFileSync(filepath, "utf8");
    } else {
      return null;
    }
  }

  exists(filepath: string): boolean {
    return this.files.includes(filepath);
  }
}
```

You'll also need a `recursivelyReadDir` function:

```ts
function recursivelyReadDir(directory: string): string[] {
  const files = fs.readdirSync(directory);
  const results: string[] = [];

  for (const file of files) {
    const filepath = `${directory}/${file}`;

    if (fs.statSync(filepath).isDirectory()) {
      results.push(...recursivelyReadDir(filepath));
    } else {
      results.push(filepath);
    }
  }

  return results;
}
```

Now that we can read from the filesystem, we can move on to creating a list of content files.

## Creating ContentFiles

First, create a file called `lib/parse.ts`. This file will be used for turning raw files into a type we can deal with and sort. We'll create the `ContentFile` type like so:

```ts
export type ContentFile = {
  path: string;
  extension: string;
  data: string;
};
```

We'll also need a `parseFilesInDirectory` function to turn a filesystem into an array of `ContentFile`s. I wrote some tests for this, but I won't bother including those here. Here's the code for `parseFilesInDirectory`:

```ts
export function parseFilesInDirectory(
  filesystem: Filesystem,
  allowedExtensions = ["md", "mdx"],
): ContentFile[] {
  const files = filesystem.files;
  const results: ContentFile[] = [];

  for (const file of files) {
    let path = file.replace(/^\.\//, "");

    const pathParts = path.split(".");
    const extension = pathParts.pop();
    path = pathParts.join(".");

    if (!extension || !allowedExtensions.includes(extension)) {
      continue;
    }
    const data = filesystem.read(file);
    if (data) {
      results.push({
        path: path,
        extension: extension || "",
        data,
      });
    }
  }

  return results;
}
```

# Generating ContentRoutes

Now we'll need the `ContentRoute` type. This should look like the JSON you saw earlier for each route file. Create a `lib/route.ts` file with the following code:

```ts
export type ContentRoute = {
  route: string;
  content: string;
  frontmatter: object;
  outline: Header[];
};
```

You'll get an error with the `OutlineNode` type. We'll create that in a bit.

Now it's time to actually create the `ContentRoutes` that we'll output in our json files. To do this we'll need to:

1. Figure out the route based on the filepath (i.e. docs/index.md -> docs/)
2. Get the Outline for a file
3. Get the frontmatter for a file

## Generating Outlines

In that same file, create the `OutlineNode` type:

```ts
export type Header = {
  text: string;
  level: string;
};
```

Now let's write an algorithm to find these headers!

Use the following function:

```ts
export function getHeaders(content: string): Header[] {
  const headers: Header[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#+)\s+(.*)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      headers.push({
        text,
        level,
      });
    }
  }

  return headers;
}
```

Github copilot autocompleted this one for me. No clue what the regex even does tbh.

## Parsing Frontmatter

Parsing frontmatter is easy, we can just use the [gray matter](https://www.npmjs.com/package/gray-matter) library:

```ts
export function splitFrontmatter(data: string): {
  frontmatter: object;
  content: string;
} {
  const result = matter(data);

  return {
    frontmatter: result.data,
    content: result.content,
  };
}
```

## Figuring out the Route

Figuring out the route is also not that difficult. Here's basically what we want:

- docs/something.md -> docs/something
- docs/index -> docs/
- docs/another/coolthing -> docs/another/coolthing
- docs/another/index -> docs/another

We really just need to check if there's an index at the end, and remove it if there is

## Put it all together!

Now that we have all the ingredients, we can put it together to make one very cool function:

```ts

```

# Outputting the files

# Wrapping it Up
