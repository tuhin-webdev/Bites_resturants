import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFAF5",
          100: "#FAF6ED",
          200: "#F4ECD9",
          300: "#EDE1C4",
          DEFAULT: "#FCFBF7",
        },
        charcoal: {
          50: "#8E8B85",
          100: "#6B6760",
          200: "#49453F",
          300: "#332F2A",
          DEFAULT: "#1E1B18",
          dark: "#141210",
        },
        primary: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          DEFAULT: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
        hover: "0 20px 40px -15px rgba(245, 158, 11, 0.15)",
        card: "0 4px 20px -2px rgba(30, 27, 24, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
