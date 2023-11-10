import { ContentRoute, getListFile } from "@/lib/content";
import SidebarLink from "@/components/SidebarLink";

interface SidebarItemProps {
  routes: ContentRoute[];
  urlPrefix: string[];
}

export default async function Sidebar() {
  const listFile: ContentRoute[] = await getListFile();
  const documentationRoutes = getOnlyDocsRoutes(listFile);

  const splitRoutes = splitContentRoutes(documentationRoutes);
  const components: JSX.Element[] = [];

  let i = 0;
  for (const [url, routes] of splitRoutes) {
    components.push(
      <SidebarItem urlPrefix={["docs", url]} routes={routes} key={i} />,
    );
    i++;
  }

  return (
    <div className="p-4 border-r-gray-500 border-r-2 border-0 h-screen-minus-header min-w-[16rem]">
      <h2 className="text-2xl underline">Documentation</h2>
      {...components}
      <div className="mt-4"></div>
    </div>
  );
}

function SidebarItem({ routes, urlPrefix }: SidebarItemProps) {
  let title = urlPrefix[urlPrefix.length - 1].toUpperCase();
  let url = "";

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    if (route.route === "") {
      title = route.frontmatter.title;
      url = urlPrefix.join("/");
      routes.splice(i, 1);
    }
  }
  const components: JSX.Element[] = [];

  if (routes.length > 0) {
    const splitRoutes = splitContentRoutes(routes);
    let i = 0;
    for (const [url, route] of splitRoutes) {
      components.push(
        <SidebarItem urlPrefix={[...urlPrefix, url]} routes={route} key={i} />,
      );
      i++;
    }
  }

  return (
    //
    <div className="ml-2 text-white">
      <SidebarLink url={"/" + url} title={title} />
      {...components}
    </div>
  );
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
