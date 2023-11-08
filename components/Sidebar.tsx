import Link from "next/link";
import { ContentRoute, getListFile } from "@/lib/content";

export default async function Sidebar() {
  const listFile: ContentRoute[] = await getListFile();
  const splitRoutes = splitContentRoutes(listFile);

  return (
    <div className="p-4 border-r-gray-500 border-r-2 border-0 h-screen-minus-header">
      <h2 className="text-2xl">Documentation</h2>

      <div className="mt-4"></div>
    </div>
  );
}

function SidebarItem() {
  return <></>;
}

function splitContentRoutes(routes: ContentRoute[]): Map<string, ContentRoute> {
  for (const route of routes) {
    const splitRoute = route.route.split("/");

    if (splitRoute[0] === "") {
      splitRoute.shift();
    }

    console.log(splitRoute);
  }

  return new Map();
}
