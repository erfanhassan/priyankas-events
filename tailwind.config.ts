import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF8C42",
          "orange-light": "#FFB07A",
          "orange-dark": "#E67325",
          gold: "#FFD166",
          coral: "#EF4444",
          cream: "#FFF8F0",
          "cream-dark": "#FFF0E0",
        },
        surface: {
          white: "#FFFFFF",
          light: "#FAFAFA",
          muted: "#F5F5F5",
          dark: "#1A1A2E",
          "dark-light": "#2D2D44",
        },
        text: {
          primary: "#1A1A2E",
          secondary: "#4A4A6A",
          muted: "#8A8AAA",
          inverse: "#FFFFFF",
        },
      },
      fontFamily: {
        heading: ["Sora", "sans-serif"],
        body: ["BioRhyme", "serif"],
        cursive: ['"Playball"', "cursive"],
      },
      animation: {
        "marquee-left": "marquee-left 30s linear infinite",
        "marquee-right": "marquee-right 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "text-reveal": "text-reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "count-flip": "count-flip 0.6s ease-in-out",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "text-reveal": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 140, 66, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 140, 66, 0.6)" },
        },
        "count-flip": {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(-90deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
        "3xl": "64px",
      },
      perspective: {
        "1000": "1000px",
        "1200": "1200px",
        "1500": "1500px",
        "2000": "2000px",
      },
    },
  },
  plugins: [],
};
export default config;
