"use client";

import { useRef, useEffect, useState, useCallback, ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import NextImage from "next/image";

interface TextOverlay {
  text: ReactNode;
  subtext?: ReactNode;
  scrollStart: number;
  scrollEnd: number;
  position: "left" | "right" | "center";
  size?: "normal" | "large" | "massive";
}

const overlays: TextOverlay[] = [
  {
    text: (
      <>
        <span className="font-cursive text-brand-orange font-normal">9 Years</span> of Exhibition Excellence
      </>
    ),
    subtext: "Transforming venues across Dhaka.",
    scrollStart: 0.05,
    scrollEnd: 0.25,
    position: "left",
    size: "normal",
  },
  {
    text: (
      <>
        <span className="font-cursive text-brand-orange font-normal">60+</span> Successful <span className="font-cursive text-brand-orange font-normal">Events</span>
      </>
    ),
    subtext: "Curating spaces. Amplifying footfall.",
    scrollStart: 0.30,
    scrollEnd: 0.55,
    position: "right",
    size: "normal",
  },
  {
    text: (
      <>
        We create the <span className="font-cursive text-brand-orange font-normal">hype.</span>
      </>
    ),
    subtext: "Our stallers make the profit.",
    scrollStart: 0.60,
    scrollEnd: 0.80,
    position: "center",
    size: "large",
  },
  {
    text: (
      <>
        <span className="font-cursive text-brand-orange font-normal">Welcome</span> <span>to</span>
      </>
    ),
    subtext: "Priyanka's Event",
    scrollStart: 0.85,
    scrollEnd: 1.0,
    position: "center",
    size: "massive",
  },
];

// Gradient colors for the animated background fallback
const gradientStops = [
  { offset: 0, colors: ["#FF8C42", "#FFD166", "#FFF8F0"] },
  { offset: 0.25, colors: ["#FFD166", "#FF8C42", "#EF4444"] },
  { offset: 0.5, colors: ["#1A1A2E", "#FF8C42", "#FFD166"] },
  { offset: 0.75, colors: ["#2D2D44", "#EF4444", "#FF8C42"] },
  { offset: 1.0, colors: ["#1A1A2E", "#2D2D44", "#FF8C42"] },
];

function interpolateColor(color1: string, color2: string, factor: number): string {
  const hex = (c: string) => parseInt(c, 16);
  const r1 = hex(color1.slice(1, 3)), g1 = hex(color1.slice(3, 5)), b1 = hex(color1.slice(5, 7));
  const r2 = hex(color2.slice(1, 3)), g2 = hex(color2.slice(3, 5)), b2 = hex(color2.slice(5, 7));
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  return `rgb(${r},${g},${b})`;
}

function getGradientColors(progress: number): string[] {
  let i = 0;
  for (let j = 0; j < gradientStops.length - 1; j++) {
    if (progress >= gradientStops[j].offset && progress <= gradientStops[j + 1].offset) {
      i = j;
      break;
    }
  }
  const start = gradientStops[i];
  const end = gradientStops[Math.min(i + 1, gradientStops.length - 1)];
  const segmentProgress = (progress - start.offset) / (end.offset - start.offset || 1);
  
  return start.colors.map((c, idx) => interpolateColor(c, end.colors[idx], segmentProgress));
}

function TextOverlayComponent({
  overlay,
  progress,
}: {
  overlay: TextOverlay;
  progress: number;
}) {
  const { text, subtext, scrollStart, scrollEnd, position, size } = overlay;

  // Calculate visibility: fade in first 30%, full middle 40%, fade out last 30%
  const range = scrollEnd - scrollStart;
  const fadeInEnd = scrollStart + range * 0.3;
  const fadeOutStart = scrollStart + range * 0.7;
  
  let opacity = 0;
  let translateY = 40;
  
  if (progress >= scrollStart && progress <= scrollEnd) {
    if (progress < fadeInEnd) {
      const t = (progress - scrollStart) / (fadeInEnd - scrollStart);
      opacity = t;
      translateY = 40 * (1 - t);
    } else if (progress > fadeOutStart) {
      const t = (progress - fadeOutStart) / (scrollEnd - fadeOutStart);
      opacity = 1 - t;
      translateY = -40 * t;
    } else {
      opacity = 1;
      translateY = 0;
    }
  }

  const positionClasses = {
    left: "items-start text-left pl-8 sm:pl-16 lg:pl-24",
    right: "items-end text-right pr-8 sm:pr-16 lg:pr-24",
    center: "items-center text-center px-8",
  };

  const sizeClasses = {
    normal: "text-3xl sm:text-4xl lg:text-5xl",
    large: "text-4xl sm:text-5xl lg:text-6xl",
    massive: "text-5xl sm:text-7xl lg:text-9xl",
  };

  const subtextSizes = {
    normal: "text-lg sm:text-xl lg:text-2xl",
    large: "text-xl sm:text-2xl lg:text-3xl",
    massive: "text-3xl sm:text-4xl lg:text-6xl",
  };

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center ${positionClasses[position]} pointer-events-none z-10`}
      style={{
        opacity: Math.max(0, Math.min(1, opacity)),
        transform: `translateY(${translateY}px)`,
        transition: "none",
      }}
    >
      <div className={`glass-hero rounded-2xl px-6 py-5 sm:px-10 sm:py-7 max-w-4xl ${size === "massive" ? "max-w-6xl" : ""}`}>
        <h2
          className={`font-heading font-bold text-text-primary leading-tight ${sizeClasses[size || "normal"]}`}
        >
          {text}
        </h2>
        {subtext && (
          <div
            className={`font-body text-text-secondary mt-2 sm:mt-3 ${subtextSizes[size || "normal"]}`}
          >
            {size === "massive" ? (
              <div className="mt-6 flex justify-center">
                <div className="relative w-72 h-32 sm:w-96 sm:h-40 md:w-[32rem] md:h-48">
                  <NextImage 
                    src="/logo.png" 
                    alt="Priyanka's Event Logo" 
                    fill 
                    className="object-contain" 
                  />
                </div>
              </div>
            ) : (
              subtext
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasFrames, setHasFrames] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Try to load hero frames
  useEffect(() => {
    const TOTAL_FRAMES = 150;
    const tryLoadFrames = () => {
      const testImage = new Image();
      testImage.onload = () => {
        setHasFrames(true);
        setFrameCount(TOTAL_FRAMES);
        
        // Load frames concurrently
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          const img = new Image();
          const paddedIndex = String(i).padStart(3, "0");
          img.src = `/hero-frames/frames/frame_${paddedIndex}_delay-0.066s.webp`;
          img.onload = () => {
            framesRef.current[i] = img;
            // Redraw if this frame is currently needed
            const currentNeededIndex = Math.min(Math.floor(progressRef.current * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
            if (i === currentNeededIndex || i === 0) {
              drawFrame(progressRef.current);
            }
          };
        }
      };
      testImage.onerror = () => setHasFrames(false);
      testImage.src = "/hero-frames/frames/frame_000_delay-0.066s.webp";
    };
    tryLoadFrames();
  }, []);

  // Canvas drawing
  const drawFrame = useCallback(
    (progress: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Try to find and draw a loaded frame
      let drewFrame = false;
      if (hasFrames && frameCount > 0) {
        const targetFrameIndex = Math.min(
          Math.floor(progress * (frameCount - 1)),
          frameCount - 1
        );
        
        let frameIndex = targetFrameIndex;
        while (frameIndex >= 0 && !framesRef.current[frameIndex]) {
          frameIndex--;
        }
        
        const frame = framesRef.current[frameIndex];
        if (frame) {
          const scale = Math.max(
            canvas.width / frame.width,
            canvas.height / frame.height
          );
          const x = (canvas.width - frame.width * scale) / 2;
          const y = (canvas.height - frame.height * scale) / 2;
          ctx.drawImage(frame, x, y, frame.width * scale, frame.height * scale);
          drewFrame = true;
        }
      }
      
      if (!drewFrame) {
        // Animated gradient fallback
        const colors = getGradientColors(progress);
        const angle = progress * Math.PI * 2;
        const x1 = canvas.width * (0.5 + 0.5 * Math.cos(angle));
        const y1 = canvas.height * (0.5 + 0.5 * Math.sin(angle));
        const x2 = canvas.width * (0.5 - 0.5 * Math.cos(angle));
        const y2 = canvas.height * (0.5 - 0.5 * Math.sin(angle));
        
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(0.5, colors[1]);
        gradient.addColorStop(1, colors[2]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add subtle animated particles/dots
        ctx.save();
        for (let i = 0; i < 50; i++) {
          const seed = i * 137.508;
          const px = ((seed * 7.3 + progress * canvas.width * 0.5) % canvas.width);
          const py = ((seed * 11.7 + progress * canvas.height * 0.3) % canvas.height);
          const radius = 1 + (Math.sin(seed + progress * 10) + 1) * 2;
          const alpha = 0.1 + (Math.sin(seed * 0.5 + progress * 5) + 1) * 0.15;
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
        ctx.restore();

        // Add geometric shapes that morph
        ctx.save();
        ctx.globalAlpha = 0.06;
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          const cx = canvas.width * (0.2 + i * 0.15);
          const cy = canvas.height * (0.3 + Math.sin(progress * Math.PI * 2 + i) * 0.2);
          const size = 50 + Math.sin(progress * Math.PI + i * 1.5) * 30;
          ctx.beginPath();
          ctx.arc(cx, cy, size, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }
    },
    [hasFrames, frameCount]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    progressRef.current = latest;
    requestAnimationFrame(() => drawFrame(latest));
  });

  // Initial draw + resize handler
  useEffect(() => {
    drawFrame(0);
    const handleResize = () => drawFrame(progressRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Scroll progress for text overlays
  const [currentProgress, setCurrentProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setCurrentProgress(latest);
  });

  // Scroll indicator opacity
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section id="hero" ref={containerRef} className="relative h-[500vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Canvas background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform" }}
        />

        {/* Bottom gradient overlay for transition */}
        <div className="canvas-overlay absolute inset-0 pointer-events-none" />

        {/* Text overlays */}
        {overlays.map((overlay, i) => (
          <TextOverlayComponent
            key={i}
            overlay={overlay}
            progress={currentProgress}
          />
        ))}

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-sm font-body text-text-secondary tracking-widest uppercase">
            Scroll to explore
          </span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-brand-orange/40 flex justify-center pt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 rounded-full bg-brand-orange"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-orange to-brand-gold"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}
