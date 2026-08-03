"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, type MotionValue } from "motion/react";
import { TextReveal } from "./ui/TextReveal";
import Image from "next/image";

// Use the actual existing image paths from public/gallery/
const validImageNames = [
  "IMG_4886.JPG", "IMG_4888.JPG", "IMG_4889.JPG", "IMG_4891.JPG", "IMG_4892.JPG", 
  "IMG_4893.JPG", "IMG_4894.JPG", "IMG_4898.JPG", "IMG_4899.JPG", "IMG_4901.JPG"
];

// Gallery items
const galleryItems = validImageNames.map((filename, i) => ({
  id: i + 1,
  title: `Event ${i + 1}`,
  image: `/gallery/${filename}`,
  gradient: [
    "from-brand-orange to-brand-gold",
    "from-brand-gold to-brand-coral",
    "from-brand-coral to-brand-orange",
    "from-surface-dark to-surface-dark-light",
    "from-brand-orange to-brand-coral",
    "from-brand-gold to-surface-dark",
  ][i % 6],
  xOffset: Math.sin(i * 13.5) * 25, // -25vw to 25vw
  yOffset: Math.cos(i * 9.2) * 15,  // -15vh to 15vh
  rotation: Math.sin(i * 5.5) * 10, // -10deg to 10deg
}));

function TunnelFrame({
  item,
  index,
  scrollProgress,
  total,
}: {
  item: (typeof galleryItems)[0];
  index: number;
  scrollProgress: MotionValue<number>;
  total: number;
}) {
  const Z_SPACING = 2000;
  const INITIAL_Z_OFFSET = 1000;
  const END_Z_OFFSET = 1500;
  const TOTAL_SCROLL_Z = (total - 1) * Z_SPACING + INITIAL_Z_OFFSET + END_Z_OFFSET;

  // Calculate position along the Z axis
  const zPosition = useTransform(
    scrollProgress,
    [0, 1],
    [-index * Z_SPACING - INITIAL_Z_OFFSET, -index * Z_SPACING - INITIAL_Z_OFFSET + TOTAL_SCROLL_Z]
  );

  // Fade in from deep space, fade out just as it hits the camera
  const opacity = useTransform(zPosition, (z) => {
    if (z <= -8000) return 0;
    if (z >= 800) return 0;
    if (z >= -4000 && z <= 200) return 1;
    if (z < -4000) return (z + 8000) / 4000;
    return 1 - (z - 200) / 600;
  });

  // Exaggerate scale as it passes through the camera
  const scale = useTransform(zPosition, (z) => {
    if (z <= 0) return 1;
    if (z >= 800) return 3;
    return 1 + 2 * (z / 800);
  });

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-[70vw] max-w-2xl h-[40vh] md:h-[60vh] flex items-center justify-center"
      style={{
        x: `calc(-50% + ${item.xOffset}vw)`,
        y: `calc(-50% + ${item.yOffset}vh)`,
        z: zPosition,
        rotateZ: item.rotation,
        opacity,
        scale,
      }}
    >
      <div className="w-full h-full relative group">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain drop-shadow-2xl"
          />
        ) : (
          <>
            {/* Fallback gradient if no image */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white/60">
                <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
                <p className="text-sm font-body font-medium">Event #{item.id}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export function TunnelGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-10%" });

  const [activeItems, setActiveItems] = useState<typeof galleryItems>([]);

  useEffect(() => {
    // Show all 10 valid images, randomized
    const shuffled = [...galleryItems].sort(() => 0.5 - Math.random());
    setActiveItems(shuffled);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="gallery" className="relative bg-surface-dark">
      {/* Header - outside the scroll container */}
      <div ref={headerRef} className="py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-brand-orange/20 text-brand-orange font-body font-semibold text-sm rounded-full uppercase tracking-widest mb-4">
            120+ Events & Counting
          </span>
        </motion.div>
        <div className="flex flex-wrap justify-center items-end gap-x-3 md:gap-x-4 mb-2">
          <TextReveal
            text="Step Into Our"
            as="h2"
            variant="char-stagger"
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white"
          />
          <TextReveal
            text="World"
            as="span"
            variant="char-stagger"
            delay={0.3}
            className="text-5xl sm:text-6xl lg:text-7xl font-cursive font-normal text-brand-orange"
          />
        </div>
        <TextReveal
          text="Scroll through our tunnel of success — 19 years of exhibitions, expos, and experiences."
          as="p"
          variant="fade-up"
          delay={0.3}
          className="text-lg text-white/50 mt-4 max-w-2xl mx-auto"
        />
      </div>

      {/* Tunnel scroll container */}
      <div ref={containerRef} className="h-[1200vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Tunnel perspective container */}
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            {/* Tunnel wrapper */}
            <div
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {activeItems.map((item, index) => (
                <TunnelFrame
                  key={item.id}
                  item={item}
                  index={index}
                  scrollProgress={scrollYProgress}
                  total={activeItems.length}
                />
              ))}
            </div>
          </div>

          {/* Tunnel vignette effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(26,26,46,0.8)_100%)]" />
          </div>

          {/* Depth grid lines (vanishing point) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]"
              style={{
                background: `
                  linear-gradient(0deg, transparent 49.5%, rgba(255,140,66,0.3) 50%, transparent 50.5%),
                  linear-gradient(90deg, transparent 49.5%, rgba(255,140,66,0.3) 50%, transparent 50.5%)
                `,
                backgroundSize: '100px 100px',
                transform: 'perspective(500px) rotateX(60deg)',
                transformOrigin: 'center center',
              }}
            />
          </div>

          {/* Center focal point */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-orange"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
}
