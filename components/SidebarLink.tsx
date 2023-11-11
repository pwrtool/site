"use client";
import { usePathname } from "next/navigation";
import OnThisPage from "./OnThisPage";
import { Header } from "@/lib/content";

interface SidebarLinkProps {
  url: string;
  title: string;
  outline: Header[];
}

export default function SidebarLink({ url, title, outline }: SidebarLinkProps) {
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
      {url === pathname ? (
        <OnThisPage headers={outline} />
      ) : (
        <div className="w-0 h-0"></div>
      )}
    </>
  );
}
