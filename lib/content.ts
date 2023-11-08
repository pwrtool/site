export interface SplitRoute {
  prefix: string;
  routes: ContentRoute[];
}

export type ContentRoute = {
  content: string;
  route: string;
  frontmatter: Frontmatter;
  outline?: Header[];
};

type Header = {
  level: string;
  text: string;
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

export async function getListFile(): Promise<ContentRoute[]> {
  try {
    const url = process.env.SITE_URL + "/content/list.json";
    const data = await fetch(url, { cache: "no-store" });
    const list = (await data.json()) as ContentRoute[];

    console.log(list);

    return Promise.resolve(list);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function getContentRoute(route: string): Promise<ContentRoute> {
  try {
    const url =
      process.env.SITE_URL + "/content/" + route.replaceAll("/", ">") + ".json";
    const data = await fetch(url);
    const node = (await data.json()) as ContentRoute;

    return Promise.resolve({
      content: node.content,
      route: route,
      frontmatter: node.frontmatter,
      outline: node.outline,
    });
  } catch (e) {
    return Promise.reject(e);
  }
}
