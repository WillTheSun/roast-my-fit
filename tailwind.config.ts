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
        "electric-blue": "#1E90FF",
        "neon-pink": "#FF1493",
        "charcoal": "#333333",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      backgroundColor: {
        "electric-blue-10": "rgba(30, 144, 255, 0.1)",
      },
      textColor: {
        "neon-pink": "#FF1493",
      },
    },
  },
  plugins: [],
};
export default config;
