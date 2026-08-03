"use client";

import { motion } from "motion/react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "hero";
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  variant = "light",
  hover = true,
}: GlassCardProps) {
  const baseClasses = {
    light: "glass",
    dark: "glass-dark",
    hero: "glass-hero",
  };

  return (
    <motion.div
      className={`rounded-2xl p-6 ${baseClasses[variant]} ${className}`}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: "0 20px 60px rgba(255, 140, 66, 0.15)",
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
