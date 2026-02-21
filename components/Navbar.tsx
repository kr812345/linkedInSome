'use client'
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-[80%] lg:w-[60%] z-50 bg-bg-background/80 backdrop-blur-md border border-bg-border rounded-full shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              {/* Placeholder Icon/Logo */}
              <div className="h-8 w-8 bg-bg-primary rounded-md flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="text-lg sm:text-xl font-bold text-text-primary">
                LinkedIn
              </span>
            </Link>
          </div>

          {/* Right Section: Links & Feedback Button */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
              >
                Waiting List
              </Link>
              {/* <Link
                href="/about"
                className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
              >
                About
              </Link> */}
            </div>
            {/* <button className="hidden sm:block bg-bg-primary hover:bg-bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
              Feedback
            </button> */}

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-text-primary p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-bg-background/95 backdrop-blur-md border border-bg-border rounded-2xl shadow-lg py-4 px-6 flex flex-col gap-3">
          <Link
            href="/product"
            className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors py-2"
            onClick={() => setMobileOpen(false)}
          >
            Product
          </Link>
          {/* <Link
            href="/about"
            className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors py-2"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link> */}
          {/* <button className="bg-bg-primary hover:bg-bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm w-full">
            Feedback
          </button> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
