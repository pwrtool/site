import Link from "next/link";
import {
  SplitRoute,
  splitContentRoutes,
  ContentRoute,
  getListFile,
} from "@/lib/content";

export default async function Sidebar() {
  const listFile: ContentRoute[] = await getListFile();
  const contentRoutes: ContentRoute[] = [];

  for (const route of listFile) {
    const split = route.route.split("/");

    if (split[0] === "") {
      // remove the first element
      split.shift();
    }

    if (split[0] === "docs") {
      split.shift();
      const url = split.join("/");
      route.route = url;
      contentRoutes.push(route);
    }
  }
  const routes = splitContentRoutes(contentRoutes);

  return (
    <div className="p-4 border-r-gray-500 border-r-2 border-0 h-screen-minus-header">
      <h2 className="text-2xl">Documentation</h2>

      <div className="mt-4">
        {routes.map((route, i) => (
          <SidebarItem route={route} parentPrefix={""} key={i} />
        ))}
      </div>
    </div>
  );
}

interface SidebarItemProps {
  route: SplitRoute;
  parentPrefix?: string;
}

function SidebarItem({ route, parentPrefix = "" }: SidebarItemProps) {
  let title = capitalizeFirstLetter(route.prefix);
  let href = parentPrefix + route.prefix + "/";

  const newRoutes: ContentRoute[] = [];
  for (let i = 0; i < route.routes.length; i++) {
    const currentRoute = route.routes[i];

    if (currentRoute.route === "") {
      title = currentRoute.frontmatter.title;
      href = parentPrefix + route.prefix + "/";
    } else {
      newRoutes.push(currentRoute);
    }
  }

  const splitRoutes = splitContentRoutes(route.routes);

  return (
    <div>
      <Link
        href={href}
        className="text-white hover:text-white text-lg transition-all underline-hover"
      >
        {title}
      </Link>
      {splitRoutes.length > 1 ? (
        <div className="pl-2">
          {splitRoutes.map((route, i) => (
            <SidebarItem route={route} parentPrefix={href} key={i} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function capitalizeFirstLetter(str: string | undefined): string {
  if (str === undefined) {
    return "";
  }

  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
