import {
  generateRoutemap,
  FileTree,
  generateFileTree,
} from "../lib/content-loader";
import { expect, test, describe } from "bun:test";

describe("generateRoutemap", () => {
  test("empty tree", () => {
    const map = new Map<string, string | FileTree>();
    expect(generateRoutemap(map)).toEqual(new Map<string, string>());
  });
  test("1 dimensional tree", () => {
    const tree = {
      "index.mdx": "index.mdx",
      "about.mdx": "about.mdx",
      "hello.mdx": "hello.mdx",
    };
    const map = new Map(Object.entries(tree));

    const expected = new Map([
      ["/", "index.mdx"],
      ["/about", "about.mdx"],
      ["/hello", "hello.mdx"],
    ]);

    expect(generateRoutemap(map)).toEqual(expected);
  });
  test("2 dimensional tree", () => {
    const map = new Map(
      Object.entries({
        "index.mdx": "index.mdx",
        "about.mdx": "about.mdx",
        docs: new Map(
          Object.entries({
            "index.mdx": "index.mdx",
            "hello.mdx": "hello.mdx",
          }),
        ),
      }),
    );
    const expected = new Map([
      ["/", "index.mdx"],
      ["/about", "about.mdx"],
      ["/docs", "docs/index.mdx"],
      ["/docs/hello", "docs/hello.mdx"],
    ]);

    expect(generateRoutemap(map)).toEqual(expected);
  });
  test("plain markdown files", () => {
    const map = new Map(
      Object.entries({
        "index.md": "index.md",
        "about.md": "about.md",
        docs: new Map(
          Object.entries({
            "index.md": "index.md",
            "hello.md": "hello.md",
          }),
        ),
      }),
    );
    const expected = new Map([
      ["/", "index.md"],
      ["/about", "about.md"],
      ["/docs", "docs/index.md"],
      ["/docs/hello", "docs/hello.md"],
    ]);

    expect(generateRoutemap(map)).toEqual(expected);
  });
});
