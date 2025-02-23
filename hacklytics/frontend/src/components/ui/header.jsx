"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from '../../app/animations.module.css';
import Image from "next/image";

const Header = () => {




  return (
    <header className={`w-full z-10 ${'bg-[#0e1111] text-white'}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center group">
              <div className="relative w-8 h-8 mr-2">
                {/* <Image
                  src="/logo2.jpg"
                  alt="Arbitrage Logo"
                  fill
                  className="object-contain"
                  priority
                /> */}
              </div>
              <span className="text-2xl font-bold text-[#ffffff] relative">
                Arbitr
                <span className="text-[#408830]">a</span>
                <span className="text-[#408830]">i</span>
                <span className="text-[#ffffff]">d</span>
                <span className="text-[#ffffff]">e</span>
                <span className="text-[#ffffff]">r</span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#408830] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </span>
            </Link>
          </motion.div>




        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className={`${styles['link-shadow']} text-[#ffffff] hover:text-[#ADEBB3]`}
          >
            Home
          </Link>
        </motion.div>

        <nav className="hidden md:flex space-x-6" >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/about"
              className={`${styles['link-shadow']} text-[#ffffff] hover:text-[#ADEBB3]`}
            >
              About
            </Link>
          </motion.div>

        </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;