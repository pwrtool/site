import Link from "next/link";
import { ContentRoute, getListFile } from "@/lib/content";

interface SidebarItemProps {
  splitRoutes: Map<string, ContentRoute[]>;
  urlPrefix: string[];
}

export default async function Sidebar() {
  const listFile: ContentRoute[] = await getListFile();
  const documentationRoutes = getOnlyDocsRoutes(listFile);

  const splitRoutes = splitContentRoutes(documentationRoutes);
  console.log(splitRoutes);

  return (
    <div className="p-4 border-r-gray-500 border-r-2 border-0 h-screen-minus-header">
      <h2 className="text-2xl">Documentation</h2>

      <div className="mt-4"></div>
    </div>
  );
}

function SidebarItem({ splitRoutes, urlPrefix }: SidebarItemProps) {
  console.log(splitRoutes);
  console.log(urlPrefix);
  console.log("");

  return <></>;
}

function getOnlyDocsRoutes(routes: ContentRoute[]): ContentRoute[] {
  const documentationRoutes = routes.filter((route) =>
    route.route.startsWith("/docs"),
  );

  for (const route of documentationRoutes) {
    const splitRoute = route.route.split("/");

    if (splitRoute[0] === "") {
      splitRoute.shift();
    }
    if (splitRoute[0] === "docs") {
      splitRoute.shift();
    }

    route.route = splitRoute.join("/");
  }

  return documentationRoutes;
}

function splitContentRoutes(
  routes: ContentRoute[],
): Map<string, ContentRoute[]> {
  const splitRoutes = new Map<string, ContentRoute[]>();

  for (const route of routes) {
    const routeParts = route.route.split("/");

    if (routeParts[0] === "") {
      routeParts.shift();
    }
    const firstPart = routeParts.shift();
    route.route = routeParts.join("/");

    if (firstPart === undefined) {
      console.log("firstPart is undefined");
      continue;
    }

    if (!splitRoutes.has(firstPart)) {
      splitRoutes.set(firstPart, [route]);
    } else {
      splitRoutes.get(firstPart)?.push(route);
    }
  }

  return splitRoutes;
}
