import { getNodeFromRoute, generateContentTree } from "@/lib/content-tree";
import { describe, expect, test } from "bun:test";

describe("getNodeFromRoute", () => {
  const contentTree = [
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

  test("It returns the getting started page", () => {
    const route = ["getting-started"];
    const node = getNodeFromRoute(route, contentTree);
    expect(node.title).toBe("Getting Started");
  });
  test("It returns the setup page", () => {
    const route = ["getting-started", "setup"];
    const node = getNodeFromRoute(route, contentTree);
    expect(node.title).toBe("Setup");
  });
  test("It returns the install page", () => {
    const route = ["getting-started", "install"];
    const node = getNodeFromRoute(route, contentTree);
    expect(node.title).toBe("Install");
  });
  test("It returns the writing powertools page", () => {
    const route = ["writing-powertools"];
    const node = getNodeFromRoute(route, contentTree);
    expect(node.title).toBe("Writing Powertools");
  });
  test("It throws an error if the route is not found", () => {
    const route = ["not-found"];
    expect(() => getNodeFromRoute(route, contentTree)).toThrow(
      "Could not find route not-found",
    );
  });
});

describe("generateContentTree", () => {
  test("It returns a content tree", () => {
    const files = [
      {
        title: "Getting Started",
        content: "getting started page",
        filepath: "getting-started/index.mdx",
      },
      {
        title: "Install",
        content: "installation page",
        filepath: "getting-started/install.mdx",
      },
      {
        title: "Setup",
        content: "This is the setup page.\n# Hello world!",
        filepath: "getting-started/setup.mdx",
      },
      {
        title: "Writing Powertools",
        content: "page about writing powertools",
        filepath: "writing-powertools",
      },
    ];
    const contentTree = generateContentTree(files);
    expect(contentTree).toEqual([
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
    ]);
  });
});
