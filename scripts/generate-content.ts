// code in this script is copied from pwrtool/simple-content-layer
// It's not being used as a powertool since the CI system has not been written yet.

const input = "./content";
const output = "./public/content";

function main() {
  const filesystem = new LocalDirectory(input);
  const contentFiles = parseFilesInDirectory(filesystem);
  const contentRoutes = getContentRoutes(contentFiles);

  const outputFiles = getOutputFiles(contentRoutes);
  const listFile = JSON.stringify(getListFile(contentRoutes));

  fs.writeFileSync(`${output}/list.json`, listFile);

  for (const [key, value] of outputFiles) {
    const path = `${output}/${key}`;
    const dir = path.split("/").slice(0, -1).join("/");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path, JSON.stringify(value));
  }
}

import matter from "gray-matter";
import fs from "node:fs";

type ContentRoute = {
  route: string;
  content: string;
  frontmatter: object;
  outline: Header[];
  extension?: string;
};

type Header = {
  text: string;
  level: number;
};

function getHeaders(content: string): Header[] {
  const headers: Header[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#+)\s+(.*)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      headers.push({
        text,
        level,
      });
    }
  }

  return headers;
}

function splitFrontmatter(data: string): {
  frontmatter: object;
  content: string;
} {
  const result = matter(data);

  return {
    frontmatter: result.data,
    content: result.content,
  };
}

export function getRoute(filepath: string): string {
  if (filepath.at(0) === "/") {
    filepath = filepath.slice(0);
  }

  const len = filepath.length;
  if (filepath.at(len - 1) === "/") {
    filepath = filepath.substring(0, len - 1);
  }

  const split = filepath.split("/");
  if (split[split.length - 1] === "index") {
    split.pop();
  }

  let route = split.join("/");

  if (route.at(0) !== "/") {
    route = "/" + route;
  }

  return route;
}

export function getContentRoutes(files: ContentFile[]): ContentRoute[] {
  const routes: ContentRoute[] = [];
  for (const file of files) {
    const route: ContentRoute = {
      route: "",
      content: "",
      outline: [],
      frontmatter: {},
    };

    const { content, frontmatter } = splitFrontmatter(file.data);
    route.frontmatter = frontmatter;
    route.content = content;

    route.route = getRoute(file.path);
    route.extension = file.extension;
    route.outline = getHeaders(content);

    routes.push(route);
  }

  return routes;
}

type OutputFile = {
  content: string;
  outline: Header[];
  extension: string;
  frontmatter: object;
};

function getOutputFiles(routes: ContentRoute[]): Map<string, OutputFile> {
  const outputFiles = new Map<string, OutputFile>();

  for (const route of routes) {
    // remove first / from route
    let key = route.route;
    if (key.at(0) === "/") {
      key = key.slice(1);
    }

    key = key.replaceAll("/", ">") + ".json";
    outputFiles.set(key, {
      content: route.content,
      outline: route.outline,
      extension: route.extension ?? "md",
      frontmatter: route.frontmatter,
    });
  }

  return outputFiles;
}

type ListItem = {
  route: string;
  frontmatter: object;
  outline: Header[];
};

type ListFile = ListItem[];

function getListFile(routes: ContentRoute[]): ListFile {
  const listFile: ListFile = [];
  for (const route of routes) {
    const listItem: ListItem = {
      route: route.route,
      frontmatter: route.frontmatter,
      outline: route.outline,
    };
    listFile.push(listItem);
  }

  return listFile;
}

type ContentFile = {
  path: string;
  extension: string;
  data: string;
};

function parseFilesInDirectory(
  filesystem: Filesystem,
  allowedExtensions = ["md", "mdx"],
): ContentFile[] {
  const files = filesystem.files;
  const results: ContentFile[] = [];

  for (const file of files) {
    let path = file.replace(/^\.\//, "");

    const pathParts = path.split(".");
    const extension = pathParts.pop();
    path = pathParts.join(".");

    if (!extension || !allowedExtensions.includes(extension)) {
      continue;
    }
    const data = filesystem.read(file);
    if (data) {
      results.push({
        path: path,
        extension: extension || "",
        data,
      });
    }
  }

  return results;
}

export interface Filesystem {
  files: string[];
  read(filepath: string): string | null;
  exists(filepath: string): boolean;
}

class LocalDirectory implements Filesystem {
  files: string[] = [];
  private directory: string;

  constructor(directory: string) {
    this.directory = directory;
    this.files = recursivelyReadDir(directory);
  }

  read(filepath: string): string | null {
    const file = `${this.directory}/${filepath}`;
    if (fs.existsSync(file)) {
      return fs.readFileSync(file, "utf8");
    } else {
      return null;
    }
  }

  exists(filepath: string): boolean {
    return this.files.includes(filepath);
  }
}

function recursivelyReadDir(prefix: string, directory: string = ""): string[] {
  const files = fs.readdirSync(`${prefix}/${directory}`);
  const results: string[] = [];

  for (const file of files) {
    const filepath = `${directory}/${file}`;

    if (fs.statSync(`${prefix}/${filepath}`).isDirectory()) {
      results.push(...recursivelyReadDir(prefix, filepath));
    } else {
      results.push(filepath);
    }
  }

  return results;
}

main();
