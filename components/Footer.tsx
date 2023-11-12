import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-row mt-8 p-8 text-center border-t-gray-500 border-t-2 h-[4rem]">
      <p className="text-center mx-auto">
        <Link href="https://axilirate.com/">Logo by Axilirate</Link>

        <span className="mx-2">|</span>
        <Link href="https://firesquid.co">Site by Jonathan Deiss</Link>

        <span className="mx-2">|</span>
        <Link href="https://github.com/pwrtool">Powered by Open Source</Link>
      </p>
    </footer>
  );
}
