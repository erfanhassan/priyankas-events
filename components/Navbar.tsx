"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { MagneticButton } from "./ui/MagneticButton";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Events", href: "#upcoming" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMobileOpen(false);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <nav
        className={`mx-auto max-w-7xl px-6 rounded-2xl transition-all duration-500 ${
          scrolled
            ? "glass-hero shadow-lg mx-4 sm:mx-6 lg:mx-auto py-3"
            : "py-4"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#hero");
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-32 h-12 sm:w-40 sm:h-16 md:w-48 md:h-20 transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Priyanka's Event Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <MagneticButton key={link.label} strength={0.15} radius={100}>
                <button
                  onClick={() => handleClick(link.href)}
                  className="px-4 py-2 text-base font-body font-medium text-black 
                           hover:text-brand-orange transition-colors duration-300 rounded-lg
                           hover:bg-brand-orange/5"
                >
                  {link.label}
                </button>
              </MagneticButton>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <MagneticButton strength={0.2} radius={120}>
              <button
                onClick={() => handleClick("#contact")}
                className="px-6 py-2.5 bg-gradient-to-r from-brand-orange to-brand-gold 
                         text-white font-body font-semibold text-sm rounded-xl
                         shadow-md hover:shadow-lg hover:shadow-brand-orange/25 
                         transition-all duration-300 active:scale-95"
              >
                Get in Touch
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-brand-orange/5 transition-colors"
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-6 h-0.5 bg-text-primary rounded-full"
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 4 : 0 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-text-primary rounded-full"
              animate={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-text-primary rounded-full"
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -4 : 0 }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{
            height: mobileOpen ? "auto" : 0,
            opacity: mobileOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="pt-4 pb-2 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => handleClick(link.href)}
                className="text-left px-4 py-3 text-lg font-body font-medium text-black 
                         hover:text-brand-orange hover:bg-brand-orange/5 rounded-xl transition-all"
                initial={{ x: -20, opacity: 0 }}
                animate={mobileOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
              >
                {link.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
