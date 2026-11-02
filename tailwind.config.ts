import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        clinic: {
          dark: "#141413",
          surface: "#1C1C1B",
          paper: "#F6F5F2",
          card: "#EFECE6",
          bronze: "#C5A059",
          ink: "#181817",
          ivory: "#F2EFE9",
          line: "#262626"
        }
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"]
      },
      letterSpacing: {
        editorial: "0.18em"
      }
    }
  },
  plugins: []
};

export default config;
