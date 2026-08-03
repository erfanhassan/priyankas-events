"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MagneticButton } from "./ui/MagneticButton";
import { TextReveal } from "./ui/TextReveal";

const contactInfo = [
  {
    icon: "📞",
    label: "Phone",
    values: ["+880 1775-016672"],
  },
  {
    icon: "📍",
    label: "Office",
    values: ["Dhaka, Bangladesh"],
  },
];

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-5%" });

  return (
    <footer id="contact" ref={footerRef} className="bg-surface-dark relative overflow-hidden">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl translate-y-1/2" />

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Big Typography Header */}
          <div className="mb-16 lg:mb-20">
            <TextReveal
              text="Let's Create"
              as="h2"
              variant="char-stagger"
              className="text-5xl sm:text-6xl lg:text-8xl font-heading font-bold text-white"
            />
            <TextReveal
              text="Something Extraordinary"
              as="h2"
              variant="char-stagger"
              delay={0.2}
              className="text-6xl sm:text-7xl lg:text-9xl font-cursive font-normal text-brand-orange mt-2"
            />
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h3 className="font-heading text-xl font-bold text-white mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.label}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 * i + 0.3 }}
                  >
                    <span className="text-xl mt-0.5">{info.icon}</span>
                    <div>
                      <p className="font-body text-white/40 text-sm uppercase tracking-wider">
                        {info.label}
                      </p>
                      {info.values.map((v) => (
                        <p key={v} className="font-body text-white/80 text-base">
                          {v}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Facebook CTA - Primary Portfolio Hub */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-xl font-bold text-white mb-6">
                Follow Our Journey
              </h3>
              <p className="font-body text-white/50 mb-8 max-w-lg">
                Our Facebook page is the primary hub for all event coverage, behind-the-scenes content,
                and live updates. Join our community of 50K+ followers.
              </p>

              <MagneticButton
                href="https://www.facebook.com/profile.php?id=100064239546273"
                target="_blank"
                strength={0.25}
                radius={150}
              >
                <div className="group relative px-10 py-5 bg-gradient-to-r from-[#1877F2] to-[#42A5F5] 
                              rounded-2xl text-white font-body font-bold text-lg
                              shadow-xl shadow-[#1877F2]/25 hover:shadow-2xl hover:shadow-[#1877F2]/40
                              transition-shadow duration-300 flex items-center gap-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Follow us on Facebook</span>
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </div>
              </MagneticButton>


            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">

              <span className="font-body text-white/40 text-sm">
                © {new Date().getFullYear()} Priyanka&apos;s Event. All rights reserved.
              </span>
            </div>
            <p className="font-body text-white/30 text-sm">
              Premier Exhibition & Event Management · Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
