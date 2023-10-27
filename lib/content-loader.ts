import fs from "node:fs";
import path from "node:path";

export type FileTree = Map<string, string | FileTree>;

export function generateRoutemap(
  fileTree: FileTree = generateFileTree("content"),
) {
  const routemap = new Map<string, string>();

  for (const [key, value] of fileTree) {
    if (typeof value === "string") {
      // special case for index.md being the root
      if (key === "index.mdx" || key === "index.md") {
        routemap.set("/", value);
        continue;
      }

      routemap.set(`/${key.replace(".mdx", "").replace(".md", "")}`, value);
    } else {
      const submap = generateRoutemap(value);
      for (const [subkey, subvalue] of submap) {
        routemap.set(
          `/${key}${stripTailingSlash(subkey)}`,
          `${key}/${stripTailingSlash(subvalue)}`,
        );
      }
    }
  }

  return routemap;
}

function stripTailingSlash(path: string) {
  return path.replace(/\/$/, "");
}

// acts as a wrapper around fs to turn it into useful information for the generateRoutemap function
// Allows you to pass in "hypothetical" filemaps for testing
function generateFileTree(startingDir: string): FileTree {
  const fileTree = new Map<string, string | FileTree>();

  const files = fs.readdirSync(startingDir);

  for (const file of files) {
    const path = `${startingDir}/${file}`;
    const stats = fs.statSync(path);

    if (stats.isDirectory()) {
      fileTree.set(file, generateFileTree(path));
    } else {
      fileTree.set(file, file);
    }
  }

  return fileTree;
}

class ContentLoader {
  map: Map<string, string> = generateRoutemap();

  getContent(routePath: string) {
    const filepath = this.map.get(routePath);

    if (!filepath) {
      throw new Error("File not found");
    }

    const markdown = fs.readFileSync(path.join("content", filepath), "utf-8");
    return markdown;
  }
}

export const contentLoader = new ContentLoader();
