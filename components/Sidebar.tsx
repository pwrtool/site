import Link from "next/link";

const sidebarItems = [
  {
    href: "/docs",
    title: "Docs",
    children: (
      <>
        <SidebarItem href="/docs/getting-started" title="Getting Started" />
        <SidebarItem href="/docs/faq" title="FAQ" />
        <SidebarItem href="/docs/roadmap" title="Roadmap" />
        <SidebarItem href="/docs/development" title="Development" />
      </>
    ),
  },
  {
    href: "/blog",
    title: "Blog",
    children: (
      <>
        <SidebarItem href="/blog" title="Blog" />
        <SidebarItem href="/blog/1" title="Blog Post" />
      </>
    ),
  },
  {
    href: "/community",
    title: "Community",
    children: (
      <>
        <SidebarItem href="/community" title="Community" />
        <SidebarItem href="/community/1" title="Community Post" />
      </>
    ),
  },
];

export default function Sidebar() {
  return (
    <div className="p-4 border-r-white border-r-2 h-screen-minus-header">
      <h2 className="text-2xl">Documentation</h2>
      <div className="mt-4">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
}

interface SidebarItemProps {
  href: string;
  title: string;
  children?: React.ReactNode;
}

function SidebarItem({ href, title, children }: SidebarItemProps) {
  return (
    <div>
      <Link
        href={href}
        className="text-white hover:text-white text-lg transition-all"
      >
        {title}
      </Link>
      <div className="pl-2">{children}</div>
    </div>
  );
}
