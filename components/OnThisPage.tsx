"use client";
import { Header } from "@/lib/content";

interface OnThisPageProps {
  headers: Header[];
}

export default function OnThisPage({ headers }: OnThisPageProps) {
  if (headers.length === 0) {
    return <div className="w-0 h-0"></div>;
  }

  return (
    <ul className="ml-4 text-white">
      {headers.map((header) => (
        <li key={header.text} className={`ml-${header.level}`}>
          <a href={`#${header.text.replace(/ /g, "-")}`}>- {header.text}</a>
        </li>
      ))}
    </ul>
  );
}
