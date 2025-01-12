/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: {
      //  desktop-first approach
      xl: {max: "1400px"},
      lg: {max: "1150px"},
      md: {max: "767px"},
      sm: {max: "639px"},
    },
  },
  plugins: [],
  darkMode: "class", //  tells Tailwind to apply dark mode styles based on the presence of a dark class on a parent element (e.g., <html> or <body>).
};


/*
Dark Mode Behavior:

  When darkMode: "class" is set, Tailwind CSS will apply dark mode styles only when a dark class is present on a parent element (e.g., <html class="dark"> or <body class="dark">).

  This allows you to manually toggle dark mode by adding or removing the dark class from the parent element.

  How It Works:

  Tailwind CSS provides dark mode variants for utilities, such as dark:bg-black or dark:text-white.

  These styles will only take effect when the dark class is present on a parent element.
 */