import { describe, expect, test } from "bun:test";
import { getContentRoutes, getContentRoute } from "@/lib/content";

describe("getContentRoutes", () => {
  test("example 1", () => {
    const files = [
      {
        filepath: "content/example1.md",
        content: "example1",
        frontmatter: {
          title: "Example 1",
          description: "Example 1 description",
          weight: 1,
        },
      },
    ];
    const routes = getContentRoutes(files);
    expect(routes).toEqual([
      {
        content: "example1",
        route: "example1",
        frontmatter: {
          title: "Example 1",
          description: "Example 1 description",
          weight: 1,
        },
      },
    ]);
  });
  test("example 2", () => {
    const files = [
      {
        filepath: "content/example2.md",
        content: "example2",
        frontmatter: {
          title: "Example 2",
          description: "Example 2 description",
          weight: 2,
        },
      },
      {
        filepath: "content/example1.md",
        content: "example1",
        frontmatter: {
          title: "Example 1",
          description: "Example 1 description",
          weight: 1,
        },
      },
    ];

    const routes = getContentRoutes(files);
    expect(routes).toEqual([
      {
        content: "example2",
        route: "example2",
        frontmatter: {
          title: "Example 2",
          description: "Example 2 description",
          weight: 2,
        },
      },
      {
        content: "example1",
        route: "example1",
        frontmatter: {
          title: "Example 1",
          description: "Example 1 description",
          weight: 1,
        },
      },
    ]);
  });
  test("deals with index files", () => {
    const files = [
      {
        filepath: "content/example2/index.md",
        content: "example2",
        frontmatter: {
          title: "Example 2",
          description: "Example 2 description",
          weight: 2,
        },
      },
      {
        filepath: "content/example1.md",
        content: "example1",
        frontmatter: {
          title: "Example 1",
          description: "Example 1 description",
          weight: 1,
        },
      },
    ];

    const routes = getContentRoutes(files);
    expect(routes).toEqual([
      {
        content: "example2",
        route: "example2",
        frontmatter: {
          title: "Example 2",
          description: "Example 2 description",
          weight: 2,
        },
      },
      {
        content: "example1",
        route: "example1",
        frontmatter: {
          title: "Example 1",
          description: "Example 1 description",
          weight: 1,
        },
      },
    ]);
  });
});

describe("getContentRoute", () => {
  const routes = [
    {
      frontmatter: {
        title: "Example 1",
        description: "Example 1 description",
        weight: 1,
      },
      content: "example1",
      route: "example1",
    },
    {
      frontmatter: {
        title: "Example 2",
        description: "Example 2 description",
        weight: 2,
      },
      content: "example2",
      route: "example2",
    },
  ];

  test("example 1", () => {
    const route = getContentRoute("example1", routes);
    expect(route).toEqual({
      frontmatter: {
        title: "Example 1",
        description: "Example 1 description",
        weight: 1,
      },
      content: "example1",
      route: "example1",
    });
  });
  test("it fails", () => {
    const route = getContentRoute("example3", routes);
    // @ts-expect-error not sure why it complains about this tbh
    expect(route).toEqual(undefined);
  });
});
