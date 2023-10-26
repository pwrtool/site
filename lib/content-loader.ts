import fs from "node:fs";

function getMarkdownFilesInDirectory(dir: string) {
  const files = fs.readdirSync(dir);

  for (let i = 0; i < files.length; i++) {
    // if it's a directory, recursively call this function
    if (fs.lstatSync(dir + "/" + files[i]).isDirectory()) {
      getMarkdownFilesInDirectory(dir + "/" + files[i]);
    } else {
      // add the file to the array of files
      files.push(files[i]);
    }
  }

  console.log(files);
  return files;
}

type TreeNode = {
  url: string;
  filepath: string;
  children: TreeNode[];
};

export class ContentRenderer {
  fileTree: TreeNode = {
    url: "docs",
    filepath: "content/_index.mdx",
    children: [],
  };

  constructor() {
    const files = this.getMarkdownFilesInDirectory("content");
  }

  getFile(url: string) {}
}
