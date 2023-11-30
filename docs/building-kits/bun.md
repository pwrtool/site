---
title: Using Typescript
description: A quick guide to using the default bun package to build kits
sidebar_position: 2
---

# Build a Kit with Bun and Typescript

The best way to build a kit in javascript or typescript is with the provided `@pwrtool/kit` package on npm. This package is built in bun for bun. It has not been tested in deno or node.js, so your mileage may vary.

# Getting Your Enviornment Setup

First, create a new directory

```bash
mkdir my-first-kit
cd my-first-kit

# initialize git repo- optional
git init
```

```ts
function helloWorld() {
  return true;
}
```
