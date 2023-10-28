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
  return files.map((file) => {
    const route = file.filepath
      .split("/")
      .map((part) => part.replace(".mdx", ""));
    const [currentRoute, ...restRoute] = route;
    const currentNode: ContentNode = {
      title: file.title,
      content: file.content,
      route: currentRoute,
      children: [],
    };

    if (restRoute.length === 0) {
      return currentNode;
    }
    const children = generateContentTree([file]);
    currentNode.children = children;

    return currentNode;
  });
}

type ContentFile = {
  title: string;
  filepath: string;
  content: string;
};
