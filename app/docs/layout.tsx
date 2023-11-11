import Sidebar from "@/components/Sidebar";
import OnThisPage from "@/components/OnThisPage";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <main>
        <article>{children}</article>
      </main>
    </div>
  );
}
