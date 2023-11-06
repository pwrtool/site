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

  // find content folder by continuously searching parent directories
  // until we find a folder named content

  let contentFolder = "content";
  let parentDir = "..";
  while (!fs.existsSync(contentFolder)) {
    contentFolder = `${parentDir}/${contentFolder}`;
    parentDir = `${parentDir}/..`;
  }

  const contentFilePaths = walkSync(contentFolder);
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

export async function getContentRoute(route: string): Promise<ContentRoute> {
  const checkRoute = "/content/content>" + route.replaceAll("/", ">") + ".json";
  console.log(checkRoute);
  const data = await fetch(checkRoute);
  console.log(data.json());

  return Promise.resolve({
    content: "content",
    route: "route",
    frontmatter: {
      title: "title",
    },
  });
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
