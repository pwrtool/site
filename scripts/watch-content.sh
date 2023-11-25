#!/bin/bash


echo "Watching content..."
onchange "./content" -- ./scripts/generate-content.sh
