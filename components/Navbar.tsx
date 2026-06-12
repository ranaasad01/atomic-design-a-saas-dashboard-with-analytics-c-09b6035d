"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Bell, User, Sparkles } from 'lucide-react';
import { navLinks, APP_NAME } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isDashboard = pathname?.startsWith("/dashboard");

  const navVariants = {
    hidden: { opacity: 0, y: -16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.2, ease: "easeIn" },
    },
  };

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled || isDashboard
          ? "bg-[#1e1b4b]/95 backdrop-blur-md shadow-lg shadow-indigo-950/20 border-b border-indigo-800/30"
          : "bg-[#1e1b4b]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.08, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/30"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-white font-bold text-lg tracking-tight">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/dashboard" &&
                  pathname?.startsWith(link.href));
              return (
                <motion.div
                  key={link.href}
                  whileHover={shouldReduceMotion ? {} : { y: -1 }}
                  transition={{ duration: 0.15 }}
                >
                  <Link
                    href={link.href}
                    className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-white bg-indigo-600/40"
                        : "text-indigo-200 hover:text-white hover:bg-indigo-700/30"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-indigo-500/20 border border-indigo-400/30"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Notification Bell */}
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className="relative p-2 rounded-lg text-indigo-200 hover:text-white hover:bg-indigo-700/30 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-400 rounded-full ring-2 ring-[#1e1b4b]" />
            </motion.button>

            {/* Avatar */}
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-indigo-700/30 hover:bg-indigo-600/40 border border-indigo-600/30 transition-colors"
              aria-label="User menu"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-medium text-indigo-100">Alex K.</span>
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-indigo-200 hover:text-white hover:bg-indigo-700/30 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden overflow-hidden border-t border-indigo-800/30 bg-[#1e1b4b]/98 backdrop-blur-md"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/dashboard" &&
                    pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-600/40 text-white"
                        : "text-indigo-200 hover:text-white hover:bg-indigo-700/30"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-2 pt-2 border-t border-indigo-800/30 flex items-center gap-3 px-2 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Alex Kim</p>
                  <p className="text-xs text-indigo-300">alex@pulseanalytics.io</p>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}