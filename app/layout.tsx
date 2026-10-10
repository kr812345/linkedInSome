import "./globals.css";
import React from "react";
import { Toaster } from 'sonner';
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next"
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://linkroast.vercel.app"),
  title: "LinkRoast | Is Your LinkedIn Bringing You Clients?",
  description: "A free roast for founders. Upload your LinkedIn profile or recent posts and see whether your content would actually attract clients.",
  keywords: ["LinkedIn roast", "founder LinkedIn", "LinkedIn content", "client attraction", "LinkedIn posts roast", "Founder Content Engine"],
  icons: {
    icon: "/linkRoast_logo.svg",
    apple: "/linkRoast_logo.svg",
  },
  openGraph: {
    title: "LinkRoast | Is Your LinkedIn Bringing You Clients?",
    description: "Free AI roast for founders. Score your profile or recent posts, then unlock the rewrites.",
    url: "https://linkroast.vercel.app",
    siteName: "LinkRoast",
    images: [
      {
        url: "/linkRoast_logo.svg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkRoast | Is Your LinkedIn Bringing You Clients?",
    description: "A free roast of your LinkedIn profile or posts — scored on whether it would attract clients.",
    images: ["/linkRoast_logo.svg"],
  },
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
      <Footer/>
      </body>
    </html>
  );
}
