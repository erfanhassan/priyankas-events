"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft | null {
  const difference = new Date(targetDate).getTime() - new Date().getTime();
  if (difference <= 0) return null;

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function FlipDigit({ value, label }: { value: number; label: string }) {
  const displayValue = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="flip-card">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={displayValue}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="bg-surface-dark text-white font-heading text-3xl sm:text-5xl md:text-6xl font-bold 
                          w-16 h-20 sm:w-24 sm:h-28 md:w-28 md:h-32 rounded-xl flex items-center justify-center
                          shadow-lg border border-surface-dark-light/30
                          relative overflow-hidden">
              <span className="relative z-10">{displayValue}</span>
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent h-1/2" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="text-text-secondary font-body text-xs sm:text-sm mt-2 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  const updateTimer = useCallback(() => {
    setTimeLeft(calculateTimeLeft(targetDate));
  }, [targetDate]);

  useEffect(() => {
    setMounted(true);
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [updateTimer]);

  if (!mounted) {
    return (
      <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
        {["Days", "Hours", "Mins", "Secs"].map((label) => (
          <FlipDigit key={label} value={0} label={label} />
        ))}
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className={`text-center ${className}`}>
        <p className="font-heading text-2xl text-brand-orange">🎉 Event is Live!</p>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      <FlipDigit value={timeLeft.days} label="Days" />
      <div className="text-3xl sm:text-5xl font-bold text-brand-orange self-start mt-4 sm:mt-6">:</div>
      <FlipDigit value={timeLeft.hours} label="Hours" />
      <div className="text-3xl sm:text-5xl font-bold text-brand-orange self-start mt-4 sm:mt-6">:</div>
      <FlipDigit value={timeLeft.minutes} label="Mins" />
      <div className="text-3xl sm:text-5xl font-bold text-brand-orange self-start mt-4 sm:mt-6">:</div>
      <FlipDigit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
