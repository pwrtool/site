export const contentTree: ContentNode[] = [
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

export interface ContentNode {
  title: string;
  content: string;
  route: string;
  children: ContentNode[];
}

export function getNodeFromRoute(
  route: string[],
  tree: ContentNode[],
): ContentNode {
  const [currentRoute, ...restRoute] = route;
  const currentNode = tree.find((node) => node.route === currentRoute);
  if (!currentNode) {
    throw new Error(`Could not find route ${route.join("/")}`);
  }
  if (restRoute.length === 0) {
    return currentNode;
  }
  return getNodeFromRoute(restRoute, currentNode.children);
}

export function generateContentTree(files: ContentFile[]): ContentNode[] {
  const nodeList: ContentNode[] = [];

  for (const file of files) {
    file.filepath = file.filepath.replace(".mdx", "").replace(".md", "");
    const route = file.filepath.split("/");
    if (route[route.length - 1] === "index") {
      route.pop();
    }

    const node = {
      title: file.title,
      content: file.content,
      route: route.join("/"),
      children: [],
    };
    nodeList.push(node);
  }
  console.log(nodeList);

  return [];
}

// takes a one dimenional list of nodes and returns a tree
// the route of each node contains slashes, which are used to determine the tree structure
// e.g. the node with the route "a/b/c" is a child of the node with the route "a/b"
export function sortContentTree(nodes: ContentNode[]): ContentNode[] {
  const tree: ContentNode[] = [];

  const routeList: [string[], ContentNode][] = [];

  for (const node of nodes) {
    const route = node.route.split("/");
    routeList.push([route, node]);
  }

  while (routeList.length > 0) {
    const [route, node] = routeList.pop()!;

    if (route.length === 0) {
      tree.push(node);
      continue;
    }

    const [currentRoute, ...restRoute] = route;

    const parentNode = tree.find((node) => node.route === currentRoute);
    if (!parentNode) {
      throw new Error(`Could not find parent node with route ${currentRoute}`);
    }

    parentNode.children.push(node);
  }

  console.log(routeList);

  return tree;
}

type ContentFile = {
  title: string;
  filepath: string;
  content: string;
};
