import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        graphite: "#334155",
        gold: "#C8A96B",
        porcelain: "#F8FAFC",
        ink: "#111827",
        mist: "#E2E8F0",
        sage: "#64756A",
        oxblood: "#7A3E3E"
      },
      fontFamily: {
        display: ["DM Serif Display", "Georgia", "serif"],
        sans: ["Manrope", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        premium: "0 24px 70px rgba(15, 23, 42, 0.12)",
        card: "0 14px 40px rgba(15, 23, 42, 0.08)"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        softSlide: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        fadeUp: "fadeUp 720ms ease-out both",
        softSlide: "softSlide 280ms ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
