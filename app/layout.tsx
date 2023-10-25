import type { Metadata } from "next";
import { Oxygen as Font } from "next/font/google";
import "./globals.css";

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
      <body className={font.className}>{children}</body>
    </html>
  );
}
