"use client";
import { usePathname } from "next/navigation";
import OnThisPage from "./OnThisPage";

interface SidebarLinkProps {
  url: string;
  title: string;
}
export default function SidebarLink({ url, title }: SidebarLinkProps) {
  const pathname = usePathname();

  return (
    <>
      <a
        href={url}
        className={`${url === pathname ? "font-bold" : "text-white hover:text-gray-400"
          } hover:pl-1 text-lg`}
      >
        {title}
      </a>
      {url === pathname ? <OnThisPage /> : <div className="w-0 h-0"></div>}
    </>
  );
}
