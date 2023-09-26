import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SearchTextProvider from "./_context/search-provider";

import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leo Keemer - Portfolio Website",
  description: "Football artwork by Leo Keemer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchTextProvider>
          <NavBar />
          {children}
        </SearchTextProvider>
      </body>
    </html>
  );
}
