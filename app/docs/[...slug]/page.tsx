import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";
import { contentTree, getNodeFromRoute } from "@/lib/content-tree";

export default function Page({
  params,
}: {
  params: {
    slug: string[];
  };
  children: React.ReactNode;
}) {
  if (params.slug[0] === "docs") {
    redirect("/docs/" + params.slug.slice(1).join("/"));
  }

  const node = getNodeFromRoute(params.slug, contentTree);
  return (
    <article>
      <h1>{node.title}</h1>
      <MDXRemote source={node.content} />
    </article>
  );
}
