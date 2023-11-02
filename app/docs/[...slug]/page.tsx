import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";
import { contentRoutes, getContentRoute } from "@/lib/content";

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
  console.log(contentRoutes);

  const node = getContentRoute(params.slug.join("/"), contentRoutes);
  console.log(node);

  if (!node) {
    return <div>404</div>;
  }

  return (
    <article>
      <h1>{node.frontmatter.title}</h1>
      <MDXRemote source={node.content} />
    </article>
  );
}
