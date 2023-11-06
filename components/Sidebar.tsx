import Link from "next/link";
import { SplitRoute, splitContentRoutes, ContentRoute } from "@/lib/content";

const contentRoutes: ContentRoute[] = [
  {
    route: "install",
    content: "",
    frontmatter: {
      title: "install",
    },
  },
  {
    route: "getting-started",
    content: "",
    frontmatter: {
      title: "Getting Started",
    },
  },
  {
    route: "components",
    content: "",
    frontmatter: {
      title: "Components",
    },
  },
  {
    route: "components/button",
    content: "",
    frontmatter: {
      title: "Button",
    },
  },
  {
    route: "components/checkbox",
    content: "",
    frontmatter: {
      title: "Checkbox",
    },
  },
];

export default function Sidebar() {
  const routes = splitContentRoutes(contentRoutes);
  return (
    <div className="p-4 border-r-gray-500 border-r-2 border-0 h-screen-minus-header">
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

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
