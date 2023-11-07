import ContentRoute from "@/components/ContentRoute";

export default async function Page({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  return <ContentRoute slug={params.slug} routePrefix="docs/" />;
}
