"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full z-10 bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-700/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center group">
              <div className="text-2xl font-bold gradient-text">CryptoArb</div>
            </Link>
          </motion.div>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/markets" className="text-slate-300 hover:text-white transition-colors">
              Markets
            </Link>
            <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
              About
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
            Connect Wallet
          </button>
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-slate-800 border-t border-slate-700/30`}>
        <nav className="container mx-auto px-4 py-4 space-y-2">
          <Link href="/" className="block text-slate-300 hover:text-white transition-colors py-2">
            Dashboard
          </Link>
          <Link href="/markets" className="block text-slate-300 hover:text-white transition-colors py-2">
            Markets
          </Link>
          <Link href="/about" className="block text-slate-300 hover:text-white transition-colors py-2">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;