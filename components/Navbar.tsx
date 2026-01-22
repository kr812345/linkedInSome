import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[60%] z-50 bg-bg-background/80 backdrop-blur-md border border-bg-border rounded-full shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
               {/* Placeholder Icon/Logo */}
              <div className="h-8 w-8 bg-bg-primary rounded-md flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="text-xl font-bold text-text-primary">
                LinkedIn
              </span>
            </Link>
          </div>

          {/* Right Section: Links & Feedback Button */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/products"
                className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
              >
                Product
              </Link>
              <Link
                href="/about"
                className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
              >
                About
              </Link>
            </div>
            <button className="bg-bg-primary hover:bg-bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
              Feedback
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
