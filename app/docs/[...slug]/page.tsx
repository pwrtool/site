import { contentLoader } from "@/lib/content-loader";
import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";

export default function Page({
  params,
}: {
  params: {
    slug: string[];
  };
  children: React.ReactNode;
}) {
  const { slug } = params;
  let content: string;

  try {
    content = contentLoader.getContent("/" + slug.join("/"));
  } catch (e) {
    redirect("/404");
  }

  return <MDXRemote source={content} components={{}} />;
}
