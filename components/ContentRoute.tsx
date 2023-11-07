import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";
import { getContentRoute } from "@/lib/content";

interface ContentRouteProps {
  slug: string[];
  routePrefix?: string;
}

export default async function ContentRoute({
  slug,
  routePrefix = "",
}: ContentRouteProps) {
  const route = routePrefix + slug.join("/");
  const node = await getContentRoute(route);
  console.log(node);

  if (!node) {
    redirect("/404");
  }

  return (
    <>
      <h1>{node.frontmatter.title}</h1>
      <MDXRemote source={node.content} />
    </>
  );
}
