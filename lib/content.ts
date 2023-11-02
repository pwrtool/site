import fs from "fs";
import matter from "gray-matter";

export interface SplitRoute {
  prefix: string;
  routes: ContentRoute[];
}

export type ContentRoute = {
  content: string;
  route: string;
  frontmatter: Frontmatter;
};

export type ContentFile = {
  filepath: string;
  content: string;
  frontmatter: Frontmatter;
};

export type Frontmatter = {
  title: string;
  description?: string;
  weight?: number;
};

// wraps the actual filesystem and gray matter operations for other functions to deal with
function getContentFiles(): ContentFile[] {
  // recursively search through content folder for markdown files

  const contentFiles: ContentFile[] = [];

  const walkSync = (dir: string, filelist: string[] = []) => {
    fs.readdirSync(dir).forEach((file) => {
      filelist = fs.statSync(dir + "/" + file).isDirectory()
        ? walkSync(dir + "/" + file, filelist)
        : filelist.concat(dir + "/" + file);
    });
    return filelist;
  };

  const contentFilePaths = walkSync("content");
  for (const contentFile of contentFilePaths) {
    const content = fs.readFileSync(contentFile, "utf8");
    const { data, content: markdownContent } = matter(content);
    contentFiles.push({
      filepath: contentFile,
      content: markdownContent,
      frontmatter: data as Frontmatter,
    });
  }

  return contentFiles;
}

export function getContentRoutes(files: ContentFile[]): ContentRoute[] {
  const routes: ContentRoute[] = [];

  for (const file of files) {
    let route = removeMarkdownExtension(file.filepath.replace("content/", ""));
    const split = route.split("/");

    if (split[split.length - 1] === "index") {
      split.pop();
    }
    route = split.join("/");

    routes.push({
      frontmatter: file.frontmatter,
      content: file.content,
      route: route,
    });
  }

  return routes;
}

function removeMarkdownExtension(file: string): string {
  return file.replace(".mdx", "").replace(".md", "");
}

export function getContentRoute(
  route: string,
  routes: ContentRoute[],
): ContentRoute | undefined {
  for (const contentRoute of routes) {
    if (contentRoute.route === route) {
      return contentRoute;
    }
  }
  return undefined;
}

export function splitContentRoutes(
  contentRoutes: ContentRoute[],
): SplitRoute[] {
  const splitRoutes: SplitRoute[] = [];

  for (let i = 0; i < contentRoutes.length; i++) {
    const route = contentRoutes[i];
    const split = route.route.split("/");
    const prefix = split[0];
    let splitRoute = splitRoutes.find((r) => r.prefix === prefix);
    if (!splitRoute) {
      splitRoute = { prefix: prefix, routes: [] };
      splitRoutes.push(splitRoute);
    }

    split.shift();
    route.route = split.join("/");
    splitRoute.routes.push(route);
  }

  return splitRoutes;
}

const contentFiles = getContentFiles();
export const contentRoutes = getContentRoutes(contentFiles);
