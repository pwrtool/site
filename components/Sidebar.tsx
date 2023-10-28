import Link from "next/link";
const sidebarItems: SidebarItemProps[] = [
  {
    href: "/docs",
    title: "Getting Started",
    children: [
      { href: "/docs/installation", title: "Installation" },
      { href: "/docs/usage", title: "Usage" },
    ],
  },
  {
    href: "/docs/api",
    title: "API Reference",
    children: [
      { href: "/docs/api/cli", title: "CLI" },
      { href: "/docs/api/config", title: "Config" },
      { href: "/docs/api/commands", title: "Commands" },
    ],
  },
  {
    href: "/docs/advanced",
    title: "Advanced",
    children: [
      { href: "/docs/advanced/recipes", title: "Recipes" },
      { href: "/docs/advanced/plugins", title: "Plugins" },
      { href: "/docs/advanced/development", title: "Development" },
    ],
  },
  { href: "/docs/faq", title: "FAQ" },
  { href: "/docs/contributing", title: "Contributing" },
  { href: "/docs/code-of-conduct", title: "Code of conduct" },
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
  children?: SidebarItemProps[];
}

function SidebarItem({ href, title, children }: SidebarItemProps) {
  return (
    <div>
      <Link
        href={href}
        className="text-white hover:text-white text-lg transition-all underline-hover"
      >
        {title}
      </Link>
      <div className="pl-2">
        {children?.map((child) => <SidebarItem key={child.href} {...child} />)}
      </div>
    </div>
  );
}
