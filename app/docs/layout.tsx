import Sidebar from "@/components/Sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <main>
        <article className="prose prose-stone prose-invert">{children}</article>
      </main>
    </div>
  );
}
