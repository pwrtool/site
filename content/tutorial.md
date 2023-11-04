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
nvim .
```
