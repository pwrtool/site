#!/bin/bash


# This is useful for dev
# Make sure to npm install -g onchange
echo "Watching content..."
onchange "./content" -- ./scripts/generate-content.sh
