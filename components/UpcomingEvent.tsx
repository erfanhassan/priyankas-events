"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { CountdownTimer } from "./ui/CountdownTimer";
import { TextReveal } from "./ui/TextReveal";
import { GlassCard } from "./ui/GlassCard";

interface EventData {
  id: number;
  name: string;
  venue: string;
  date: string;
  time?: string;
  description: string;
  image_path: string | null;
  duration_days?: number;
}

export function UpcomingEvent() {
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingOptions, setShowBookingOptions] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.event) setEvent(data.event);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const endDate = event ? new Date(event.date) : new Date();
  if (event && event.duration_days && event.duration_days > 1) {
    endDate.setDate(endDate.getDate() + event.duration_days - 1);
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedStartDate = event ? new Date(event.date).toLocaleDateString("en-US", dateOptions) : "";
  const formattedEndDate = endDate.toLocaleDateString("en-US", dateOptions);
  const dateDisplay = event && event.duration_days && event.duration_days > 1
    ? `${formattedStartDate} - ${formattedEndDate}`
    : formattedStartDate;

  return (
    <section id="upcoming" ref={sectionRef} className="section-padding bg-brand-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <motion.div
              className="w-12 h-12 rounded-full border-4 border-brand-orange/20 border-t-brand-orange"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : !event ? (
          <div className="text-center">
            <div className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 mb-2">
              <TextReveal text="Stay" as="h2" variant="char-stagger" className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary" />
              <TextReveal text="Tuned" as="span" variant="char-stagger" delay={0.2} className="text-5xl sm:text-6xl lg:text-7xl font-cursive font-normal text-brand-orange" />
              <TextReveal text="For Our Next Event" as="span" variant="char-stagger" delay={0.4} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary" />
            </div>
            <TextReveal text="We're currently curating our next masterpiece. Follow us to be the first to know!" as="p" variant="fade-up" delay={0.6} className="text-xl text-text-secondary mt-6 max-w-2xl mx-auto" />
            
            {/* Decorative element */}
            <motion.div
              className="mt-12 flex justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-orange/20 to-brand-gold/20 flex items-center justify-center">
                <span className="text-4xl">🎪</span>
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            {/* Section Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-brand-orange/10 text-brand-orange font-body font-semibold text-sm rounded-full uppercase tracking-widest mb-4">
                Next Big Event
              </span>
              <TextReveal
                text="The Countdown Begins"
                as="h2"
                variant="char-stagger"
                className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary"
              />
            </motion.div>

            {/* Event Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard variant="hero" className="overflow-hidden p-0 sm:p-0" hover={false}>
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Event Details (Left Side) */}
                  <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                    <h3 className="font-cursive text-4xl sm:text-5xl lg:text-6xl text-brand-orange mb-6">
                      {event.name}
                    </h3>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-text-secondary">
                        <span className="text-2xl">📍</span>
                        <span className="font-cursive text-2xl sm:text-3xl">{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-3 text-text-secondary">
                        <span className="text-2xl">📅</span>
                        <span className="font-cursive text-2xl sm:text-3xl">{dateDisplay}</span>
                      </div>
                      {event.time && (
                        <div className="flex items-center gap-3 text-text-secondary">
                          <span className="text-2xl">⏰</span>
                          <span className="font-cursive text-2xl sm:text-3xl">{event.time}</span>
                        </div>
                      )}
                      {event.duration_days && event.duration_days > 1 && (
                        <div className="flex items-center gap-3 text-text-secondary">
                          <span className="text-2xl">⏳</span>
                          <span className="font-cursive text-2xl sm:text-3xl">{event.duration_days} Days Event</span>
                        </div>
                      )}
                    </div>

                    {event.description && (
                      <p className="font-cursive text-text-secondary text-2xl sm:text-3xl leading-relaxed mb-10">
                        {event.description}
                      </p>
                    )}

                    {/* Countdown */}
                    <div className="mt-auto">
                      <p className="font-body text-sm text-text-muted uppercase tracking-widest mb-4">
                        Event starts in
                      </p>
                      <CountdownTimer targetDate={event.date} />

                      <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        {!showBookingOptions ? (
                          <button 
                            onClick={() => setShowBookingOptions(true)}
                            className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange hover:bg-brand-orange/90 text-white font-heading font-bold text-lg rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-brand-orange/25"
                          >
                            Book Your Stall Now
                          </button>
                        ) : (
                          <div className="flex flex-col sm:flex-row gap-4">
                            <a 
                              href="https://www.facebook.com/profile.php?id=100064239546273" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center px-6 py-3 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-heading font-bold text-base rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#1877F2]/25"
                            >
                              Facebook Page
                            </a>
                            <a 
                              href="tel:+8801775016672" 
                              className="inline-flex items-center justify-center px-6 py-3 bg-brand-orange hover:bg-brand-orange/90 text-white font-heading font-bold text-base rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-orange/25"
                            >
                              Call +880 1775-016672
                            </a>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>

                  {/* Event Image (Right Side) */}
                  <div className="relative h-64 lg:h-full min-h-[300px] lg:min-h-[500px] bg-gradient-to-br from-brand-orange to-brand-gold overflow-hidden order-1 lg:order-2">
                    {event.image_path ? (
                      <Image
                        src={event.image_path}
                        alt={event.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white/80">
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="text-8xl mb-4"
                          >
                            🎪
                          </motion.div>
                          <p className="font-heading text-2xl font-bold">Event Poster</p>
                        </div>
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-black/10" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
