import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";
import { getContentRoute } from "@/lib/content";

export default async function Page({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  const route = "docs/" + params.slug.join("/");
  const node = await getContentRoute(route);
  console.log(node);

  if (!node) {
    redirect("/404");
  }

  return (
    <article>
      <h1>{node.frontmatter.title}</h1>
      <MDXRemote source={node.content} />
    </article>
  );
}
