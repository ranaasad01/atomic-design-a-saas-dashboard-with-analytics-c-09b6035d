"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, footerSections } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-[#1e1b4b] border-t border-indigo-800/30 text-indigo-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
        >
          {/* Brand Column */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-indigo-300 leading-relaxed max-w-xs mb-6">
              {APP_TAGLINE}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-indigo-800/40 hover:bg-indigo-600/50 border border-indigo-700/40 hover:border-indigo-500/50 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-indigo-300 hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <motion.div
              key={section.heading}
              variants={shouldReduceMotion ? {} : fadeInUp}
            >
              <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
                {section.heading}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-indigo-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-indigo-800/30 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-indigo-400">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-indigo-400">
            <span>Built with</span>
            <span className="text-violet-400 mx-0.5">♥</span>
            <span>for data-driven teams</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}