/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
const {heroui} = require("@heroui/theme");

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  plugins: [heroui()],
} satisfies Config;
