import Link from "next/link";

export default function Navbar() {
  return (
    <header className="p-4 border-bottom">
      <Link
        href="/"
        className="text-3xl font-bold text-white underline-hover hover:text-white"
      >
        Powertool
      </Link>

      <nav></nav>
    </header>
  );
}

function NavItem() {}
