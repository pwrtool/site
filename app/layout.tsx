import type { Metadata } from "next";
import { Oxygen as Font } from "next/font/google";
import "./globals.css";
import "prismjs/themes/prism-tomorrow.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const font = Font({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Powertool",
  description: "Automate Everything",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
