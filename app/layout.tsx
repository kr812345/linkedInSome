import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "LinkRoast",
  description: "An app used to roast your profile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#050505] text-white`}>
        <Navbar />
        <main>
          {children}
          <Analytics/>
        </main>
      </body>
    </html>
  );
}
