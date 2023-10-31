import fs from "fs";
import matter from "gray-matter";
import { FancyOut } from "@pwrtool/fancy-out";

export const contentTree = [
  {
    title: "Getting Started",
    content: "getting started page",
    route: "getting-started",
    children: [
      {
        title: "Install",
        content: "installation page",
        route: "install",
        children: [],
      },
      {
        title: "Setup",
        content: "This is the setup page.\n# Hello world!",
        route: "setup",
        children: [],
      },
    ],
  },
  {
    title: "Writing Powertools",
    content: "page about writing powertools",
    route: "writing-powertools",
    children: [],
  },
];

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

const contentFiles = getContentFiles();
export const contentRoutes = getContentRoutes(contentFiles);
