import { describe, expect, test } from "bun:test";
import {
  getContentRoutes,
  getContentRoute,
  splitContentRoutes,
  ContentRoute,
} from "@/lib/content";

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

describe("splitContentRoutes", () => {
  const exampleFrontmatter = {
    title: "example",
    description: "example description",
    weight: 1,
  };
  const exampleContent = "example content";
  test("correctly outputs one dimensional array", () => {
    const routes: ContentRoute[] = [
      {
        frontmatter: exampleFrontmatter,
        content: exampleContent,
        route: "example1",
      },
      {
        frontmatter: exampleFrontmatter,
        content: exampleContent,
        route: "example2",
      },
      {
        frontmatter: exampleFrontmatter,
        content: exampleContent,
        route: "example3",
      },
    ];
    const result = splitContentRoutes(routes);
    const expected = [
      {
        prefix: "example1",
        routes: [
          {
            frontmatter: exampleFrontmatter,
            content: exampleContent,
            route: "",
          },
        ],
      },
      {
        prefix: "example2",
        routes: [
          {
            frontmatter: exampleFrontmatter,
            content: exampleContent,
            route: "",
          },
        ],
      },
      {
        prefix: "example3",
        routes: [
          {
            frontmatter: exampleFrontmatter,
            content: exampleContent,
            route: "",
          },
        ],
      },
    ];
    const success = Bun.deepEquals(result, expected);
    if (!success) {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        console.log(result[i]);
      }
    }

    expect(success).toEqual(true);
  });
  test("deals with recursive situations", () => {
    const routes: ContentRoute[] = [
      {
        frontmatter: exampleFrontmatter,
        content: exampleContent,
        route: "example1",
      },
      {
        frontmatter: exampleFrontmatter,
        content: exampleContent,
        route: "example1/example2",
      },
      {
        frontmatter: exampleFrontmatter,
        content: exampleContent,
        route: "example1/example4",
      },
      {
        frontmatter: exampleFrontmatter,
        content: exampleContent,
        route: "example1/example2/example3",
      },
    ];
    const result = splitContentRoutes(routes);
    const expected = [
      {
        prefix: "example1",
        routes: [
          {
            frontmatter: exampleFrontmatter,
            content: exampleContent,
            route: "",
          },
          {
            frontmatter: exampleFrontmatter,
            content: exampleContent,
            route: "example2",
          },
          {
            frontmatter: exampleFrontmatter,
            content: exampleContent,
            route: "example4",
          },
          {
            frontmatter: exampleFrontmatter,
            content: exampleContent,
            route: "example2/example3",
          },
        ],
      },
    ];
    const success = Bun.deepEquals(result, expected);

    if (!success) {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        console.log(result[i]);
      }
    }
  });
});
