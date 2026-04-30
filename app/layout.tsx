import "./globals.css";
import React from "react";
import { Toaster } from 'sonner';
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next"
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LinkRoast | Roast & Refine Your LinkedIn Profile",
  description: "Get roasted by AI. LinkRoast analyzes your LinkedIn profile to provide brutal feedback and professional suggestions to stand out.",
  keywords: ["LinkedIn Roast", "AI Profile Reviewer", "Profile Optimization", "Career Advice", "LinkedIn Tips"],
  icons: {
    icon: "/linkRoast_logo.svg",
    apple: "/linkRoast_logo.svg",
  },
  openGraph: {
    title: "LinkRoast | AI LinkedIn Profile Analyzer",
    description: "Honest feedback to fix what's weak and highlight what works on your LinkedIn.",
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
    title: "LinkRoast | Roast Your LinkedIn Profile",
    description: "The AI-powered profile reviewer that gives you honest feedback.",
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
