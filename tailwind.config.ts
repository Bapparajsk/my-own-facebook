/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "setting": 'linear-gradient(135deg, rgba(123,128,152,0.49) 0%, rgba(16,0,255,0.49) 35%, rgba(16,0,255,0.49) 50%, rgba(16,0,255,0.49) 65%, rgba(163,105,117,0.50) 100%);'
      },
      boxShadow: {
        'sm-box': 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
        'custom': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(4.9px)',
      },
      colors: {
        'custom-transparent': 'rgba(255, 255, 255, 0)',
        'custom-border': 'rgba(255, 255, 255, 0.37)',
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },

  darkMode: "class",
  plugins: [
    nextui(),
  ],
};
