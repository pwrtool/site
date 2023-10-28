import Link from "next/link";
import { contentTree, ContentNode } from "@/lib/content-tree";

export default function Sidebar() {
  const sidebarItems = getSidebarItems(contentTree, "/docs");
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

export function getSidebarItems(
  contentTree: ContentNode[],
  previousPath = "",
): SidebarItemProps[] {
  return contentTree.map((node) => ({
    href: previousPath + "/" + node.route,
    title: node.title,
    children: getSidebarItems(node.children, previousPath + "/" + node.route),
  }));
}
