import Link from "next/link";
import { SplitRoute, splitContentRoutes, contentRoutes } from "@/lib/content";

export default function Sidebar() {
  return (
    <div className="p-4 border-r-white border-r-2 h-screen-minus-header">
      <h2 className="text-2xl">Documentation</h2>

      <div className="mt-4"></div>
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
