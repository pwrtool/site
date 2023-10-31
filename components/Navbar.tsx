import Link from "next/link";
import { FaGithub, FaBook } from "react-icons/fa";
import { RiInstallLine } from "react-icons/ri";

export default function Navbar() {
  return (
    <header className="p-4 border-bottom flex flex-row content-center h-[4.5rem]">
      <Link
        href="/"
        className="text-3xl font-bold text-white underline-hover hover:text-white"
      >
        Powertool
      </Link>

      <span className="flex-grow" />

      <nav className="flex flex-row space-between">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>
    </header>
  );
}

const navItems: NavItemProps[] = [
  { text: "Docs", href: "/docs", icon: <FaBook /> },
  { text: "Install", href: "/docs/install", icon: <RiInstallLine /> },
  { text: "GitHub", href: "https://github.com/pwrtool", icon: <FaGithub /> },
];

interface NavItemProps {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

function NavItem({ text, href, icon }: NavItemProps) {
  return (
    <div className="text-2xl mx-4 w-24">
      <Link
        href={href}
        className="text-white underline-hover hover:text-white flex flex-row content-center justify-center"
      >
        <span className="m-1 ">{icon}</span>
        {text}
      </Link>
    </div>
  );
}
