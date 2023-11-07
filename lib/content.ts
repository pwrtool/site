export interface SplitRoute {
  prefix: string;
  routes: ContentRoute[];
}

export type ContentRoute = {
  content: string;
  route: string;
  frontmatter: Frontmatter;
  outline: Header[];
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

export async function getContentRoute(route: string): Promise<ContentRoute> {
  const checkRoute = "/content/" + route.replaceAll("/", ">") + ".json";
  console.log(checkRoute);
  const data = await fetch(checkRoute);
  const node = (await data.json()) as ContentRoute;

  return Promise.resolve({
    content: node.content,
    route: route,
    frontmatter: node.frontmatter,
    outline: node.outline,
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
