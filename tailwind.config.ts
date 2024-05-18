import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

// @ts-ignore
const config: Config = {
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
            },
            fontFamily: {
                'robot': `"Roboto", sans-serif`,
                'ubuntu': `"Ubuntu Sans", sans-serif`,
                'roboto-mono': `"Roboto Mono", monospace`,
                'plus-jakarta-ans': `"Plus Jakarta Sans", sans-serif`,
            },
            backdropBlur: {
                'none': 'none',
                'sm': '4px',
                'DEFAULT': '8px',
                'md': '12px',
                'lg': '16px',
                'xl': '24px',
                '2xl': '40px',
                '3xl': '64px',
            }
        },
    },
    darkMode: "class",
    plugins: [ nextui()],
};
export default config;
