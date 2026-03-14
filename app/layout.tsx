import "./globals.css";
import React from "react";
import { Toaster } from 'sonner';
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "LinkRoast",
  description: "An app used to roast your profile.",
};

const inter = Inter({ weight: ["400","500","700"],
                      subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#050505] text-white`}>
        <Navbar />
        <main className={inter.className}>
          <Toaster/>
          {children}
          <Analytics/>
        </main>
      </body>
    </html>
  );
}
