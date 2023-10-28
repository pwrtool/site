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
  //remove docs/ from the route
  if (params.slug[0] === "docs") {
    redirect("/docs/" + params.slug.slice(1).join("/"));
  }
  console.log(params.slug);

  const node = getNodeFromRoute(params.slug, contentTree);
  return (
    <article>
      <h1>{node.title}</h1>
      <MDXRemote source={node.content} />
    </article>
  );
}
