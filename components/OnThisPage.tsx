"use client";
interface OnThisPageProps {
  headers: Header[];
}

interface Header {
  text: string;
  level: number;
}

export default function OnThisPage() {
  return (
    <ul className="ml-4 text-white text">
      <li>A thing</li>
      <li>Another thing</li>
      <li>A third thing</li>
    </ul>
  );
}
