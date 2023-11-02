import Link from "next/link";
import { SplitRoute, splitContentRoutes, contentRoutes } from "@/lib/content";

export default function Sidebar() {
  const routes = splitContentRoutes(contentRoutes);
  return (
    <div className="p-4 border-r-white border-r-2 h-screen-minus-header">
      <h2 className="text-2xl">Documentation</h2>

      <div className="mt-4">
        {routes.map((route, i) => (
          <SidebarItem route={route} parentPrefix={"/docs/"} key={i} />
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

  const contentRoute = route.routes.find((r) => r.route === "");
  if (contentRoute) {
    title = contentRoute.frontmatter.title ?? title;
    href = parentPrefix + route.prefix + contentRoute.route + "/";
  }

  const splitRoutes = splitContentRoutes(route.routes);
  console.log(splitRoutes);

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

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
