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
      <h1>{node.frontmatter.title}</h1>
      <MDXRemote source={node.content} />
    </>
  );
}
