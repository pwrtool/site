#!/bin/bash

rm -rf public/content
mkdir public/content
ptx pwrtool/simple-content-layer input=content output=public/content
