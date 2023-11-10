import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";
import { getContentRoute } from "@/lib/content";
import { useMDXComponents } from "@/mdx-components";
import Highlighter from "@/components/Highlighter";

interface ContentRouteProps {
  slug: string[];
  routePrefix?: string;
}

export default async function ContentRoute({
  slug,
  routePrefix = "",
}: ContentRouteProps) {
  const route = routePrefix + slug.join("/");
  const components = useMDXComponents();
  const node = await getContentRoute(route)
    .then((res) => res)
    .catch((e) => {
      console.error(
        "the following thing probably means that that the route wasn't found",
      );
      console.error(e);
      return null;
    });

  if (node === null) {
    redirect("/404");
  }

  return (
    <>
      <h1 className="text-4xl text-primary border-b-primary border-b-2">
        {node.frontmatter.title}
      </h1>
      <MDXRemote components={components} source={node.content} />
      <Highlighter />
    </>
  );
}
