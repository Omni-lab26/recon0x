import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bg2: "var(--bg2)",
        surf: "var(--surf)",
        surf2: "var(--surf2)",
        surf3: "var(--surf3)",
        bd: "var(--bd)",
        bd2: "var(--bd2)",
        bd3: "var(--bd3)",
        t1: "var(--t1)",
        t2: "var(--t2)",
        t3: "var(--t3)",
        t4: "var(--t4)",
        brand: {
          green: "#22C55E",
          cyan: "#00D4FF",
          amber: "#F59E0B",
          red: "#EF4444",
          purple: "#8B5CF6",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter2: "-0.03em",
      },
      backdropBlur: { xs: "2px" },
      animation: {
        pulse: "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
