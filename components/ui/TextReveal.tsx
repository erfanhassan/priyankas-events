"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface TextRevealProps {
  text: string;
  className?: string;
  variant?: "mask-wipe" | "fade-up" | "char-stagger";
  delay?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({
  text,
  className = "",
  variant = "char-stagger",
  delay = 0,
  once = true,
  as: Tag = "p",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  if (variant === "mask-wipe") {
    return (
      <div ref={ref} className="overflow-hidden">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
          transition={{
            duration: 0.8,
            delay,
            ease: [0.77, 0, 0.175, 1],
          }}
        >
          <Tag className={className}>{text}</Tag>
        </motion.div>
      </div>
    );
  }

  if (variant === "fade-up") {
    return (
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 0.6,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <Tag className={className}>{text}</Tag>
        </motion.div>
      </div>
    );
  }

  // char-stagger: splits text into characters and staggers their reveal
  const words = text.split(" ");

  return (
    <div ref={ref} className="overflow-hidden">
      <Tag className={`${className} flex flex-wrap`}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex mr-[0.3em]">
            {word.split("").map((char, charIndex) => {
              const globalIndex = words
                .slice(0, wordIndex)
                .reduce((acc, w) => acc + w.length, 0) + charIndex;
              return (
                <motion.span
                  key={charIndex}
                  className="inline-block"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={
                    isInView
                      ? { y: "0%", opacity: 1 }
                      : { y: "100%", opacity: 0 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: delay + globalIndex * 0.02,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </Tag>
    </div>
  );
}
