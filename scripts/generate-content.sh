#!/bin/bash

rm -rf public/content
mkdir public/content
bun run ./scripts/generate-content.ts
