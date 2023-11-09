"use client";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  url: string;
  title: string;
}
export default function SidebarLink({ url, title }: SidebarLinkProps) {
  const pathname = usePathname();

  return (
    <a
      href={url}
      className={`${url === pathname ? "font-bold" : "text-white hover:text-gray-400"
        } hover:pl-1 text-lg`}
    >
      {title}
    </a>
  );
}
