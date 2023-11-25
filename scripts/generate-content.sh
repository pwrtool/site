#!/bin/bash

rm -rf public/content
mkdir public/content
ptx bench/test input=content output=public/content
