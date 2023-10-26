import fs from "node:fs";

export function getMarkdownFiles() {
  const files = fs.readdirSync("content");

  for (let i = 0; i < files.length; i++) {
    if (!(files[i].endsWith(".mdx") || files[i].endsWith("md"))) {
      files.splice(i, 1);
      i--;
    }
  }

  console.log(files);
  return files;
}
