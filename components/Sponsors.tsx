"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextReveal } from "./ui/TextReveal";

// Placeholder sponsor data — replace logo paths with real ones
const sponsors = [
  { name: "Sponsor 1", image: "/sponsors/1.png" },
  { name: "Sponsor 2", image: "/sponsors/2.png" },
  { name: "Sponsor 3", image: "/sponsors/3.png" },
  { name: "Sponsor 4", image: "/sponsors/4.png" },
  { name: "Sponsor 5", image: "/sponsors/5.png" },
  { name: "Sponsor 6", image: "/sponsors/6.png" },
];

function SponsorLogo({ name, image }: { name: string; image: string }) {
  return (
    <div
      className="flex-shrink-0 mx-6 sm:mx-8 lg:mx-12 group cursor-pointer"
      data-cursor-hover
    >
      <div
        className="w-40 h-24 sm:w-48 sm:h-28 lg:w-56 lg:h-32 flex items-center justify-center
                  transition-transform duration-500 group-hover:-translate-y-2"
      >
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
        />
      </div>
    </div>
  );
}

export function Sponsors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const row1 = sponsors.slice(0, 3);
  const row2 = sponsors.slice(3, 6);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-surface-light relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, #1A1A2E 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-brand-orange/10 text-brand-orange font-body font-semibold text-sm rounded-full uppercase tracking-widest mb-4">
            Trusted Partners
          </span>
        </motion.div>
        <div className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 mb-2">
          <TextReveal
            text="Powered"
            as="h2"
            variant="char-stagger"
            className="text-4xl sm:text-5xl lg:text-6xl font-cursive font-normal text-brand-orange"
          />
          <TextReveal
            text="by Industry Leaders"
            as="span"
            variant="char-stagger"
            delay={0.2}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mt-2"
          />
        </div>
        <TextReveal
          text="Collaborating with Bangladesh's most prominent brands and entrepreneurs"
          as="p"
          variant="fade-up"
          delay={0.3}
          className="text-lg text-text-secondary mt-4 max-w-2xl mx-auto"
        />
      </div>

      {/* Marquee Row 1 - Left */}
      <div className="marquee-container mb-8 sm:mb-12">
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { duration: 30, repeat: Infinity, ease: "linear" },
          }}
        >
          {[...row1, ...row1, ...row1, ...row1].map((sponsor, i) => (
            <SponsorLogo key={`r1-${i}`} name={sponsor.name} image={sponsor.image} />
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 - Right */}
      <div className="marquee-container">
        <motion.div
          className="flex"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            x: { duration: 35, repeat: Infinity, ease: "linear" },
          }}
        >
          {[...row2, ...row2, ...row2, ...row2].map((sponsor, i) => (
            <SponsorLogo key={`r2-${i}`} name={sponsor.name} image={sponsor.image} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
