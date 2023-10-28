import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";
import { contentTree } from "@/lib/content-tree";

export default function Page({
  params,
}: {
  params: {
    slug: string[];
  };
  children: React.ReactNode;
}) {
  console.log(params.slug);
  return (
    <article>
      <p>{params.slug}</p>
    </article>
  );
}
