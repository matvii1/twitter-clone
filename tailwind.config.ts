import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
          'pc-hover': {'raw': '(hover: hover)'},
      }
  }
  },
  plugins: [],
} satisfies Config;
