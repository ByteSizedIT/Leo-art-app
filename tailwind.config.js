/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        ["minus-nav"]: "calc(100vh - 50px)",
      },
      minHeight: {
        ["minus-nav"]: "calc(100vh - 50px)",
      },
    },
  },
  plugins: [],
};
