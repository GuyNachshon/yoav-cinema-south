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
        background: "#000000",
        foreground: "#ffffff",
        muted: "#a3a3a3",
        "grid-bg": "#1a1a1a",
      },
      fontFamily: {
        sans: ["var(--font-the-basics)", "system-ui", "sans-serif"],
        mono: ["var(--font-the-basics-mono)", "ui-monospace", "monospace"],
        "basics-mono": ["var(--font-the-basics-mono)", "ui-monospace", "monospace"],
        "next-exit": ["var(--font-next-exit)", "sans-serif"],
      },
      spacing: {
        "navbar-height": "var(--navbar-height, 3rem)",
        "pattern-band": "var(--pattern-band-height, 4rem)",
      },
    },
  },
  plugins: [],
};

export default config;
