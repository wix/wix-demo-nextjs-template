import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "yellow-100": "#ffc657",
        "blue-100": "#5362ac",
        "white-15": "rgba(255,255,255,0.15)",
        "custom-1": "rgb(250, 250, 250)",
        "custom-2": "rgb(160, 160, 159)",
        "custom-3": "rgb(47, 46, 46)",
        site: "rgb(256, 256, 256)",
      },
      fontSize: {
        12: "12px",
        18: "18px",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        libre: ["Libre Baskerville", "serif"],
        madefor: ["Wix Madefor Display", "sans-serif"],
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade 3s ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
