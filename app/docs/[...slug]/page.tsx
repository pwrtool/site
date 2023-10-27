import { contentLoader } from "@/lib/content-loader";
import { MDXRemote } from "next-mdx-remote/rsc";

export default function Page({
  params,
}: {
  params: {
    slug: string[];
  };
  children: React.ReactNode;
}) {
  const { slug } = params;
  console.log(slug);
  const content = contentLoader.getContent("/" + slug.join("/"));
  return (
    <article>
      <MDXRemote source={content} components={{}} />
    </article>
  );
}
