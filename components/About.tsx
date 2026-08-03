"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { TextReveal } from "./ui/TextReveal";
import { GlassCard } from "./ui/GlassCard";

const steps = [
  {
    number: "01",
    title: "Securing Premier Venues",
    description:
      "We partner with the most prominent exhibition halls and convention centers across Dhaka — from Bashundhara to Bangabandhu International — locking in prime dates and premium spaces.",
    color: "from-brand-orange to-brand-gold",
  },
  {
    number: "02",
    title: "Empowering Entrepreneurs",
    description:
      "Small business owners and rising entrepreneurs get access to premium stall spaces at our events. We provide the stage — they bring their products and passion.",
    color: "from-brand-gold to-brand-coral",
  },
  {
    number: "03",
    title: "Deploying the Hype Machine",
    description:
      "Our massive network of popular business ambassadors, social media influencers, and community leaders actively promote every staller — driving footfall that converts.",
    color: "from-brand-coral to-brand-orange",
  },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax values for decorative elements
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      data-cursor-hover
    >
      {/* Background Gradient matching the Get In Touch button, meshed with mask-image */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-gold opacity-[0.15] pointer-events-none"
        style={{ 
          maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
        }}
      />

      {/* Parallax decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-32 border border-brand-orange/20 rounded-2xl pointer-events-none"
        style={{ y: y1, rotate: rotate1 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-brand-orange/10 text-brand-orange font-body font-semibold text-sm rounded-full uppercase tracking-widest mb-4">
              Our Ecosystem
            </span>
          </motion.div>
          <div className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 mb-2">
            <TextReveal text="The" as="h2" variant="char-stagger" className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary" />
            <TextReveal text="Hype & Profit" as="span" variant="char-stagger" delay={0.2} className="text-5xl sm:text-6xl lg:text-7xl font-cursive font-normal text-brand-orange mt-2" />
            <TextReveal text="Model" as="span" variant="char-stagger" delay={0.4} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary" />
          </div>
          <TextReveal
            text="A proven ecosystem where events create hype, and entrepreneurs make profit."
            as="p"
            variant="fade-up"
            delay={0.3}
            className="text-lg sm:text-xl text-text-secondary mt-6 max-w-3xl mx-auto"
          />
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            >
              <GlassCard
                variant="hero"
                className="h-full relative group transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-orange/10"
              >
                {/* Content */}
                <h3 className="font-heading text-xl font-bold text-text-primary mb-3 mt-2">
                  {step.title}
                </h3>
                <p className="font-body text-text-secondary leading-relaxed text-base">
                  {step.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div
                    className={`h-1 w-12 rounded-full bg-gradient-to-r ${step.color} 
                              group-hover:w-full transition-all duration-700`}
                  />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            Over <span className="font-bold text-brand-orange">19 years</span>, we&apos;ve perfected
            this model — connecting <span className="font-bold text-brand-orange">venues, entrepreneurs,
            and audiences</span> into a single powerful experience.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
