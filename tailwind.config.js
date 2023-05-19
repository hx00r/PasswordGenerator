/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#0F0E14",
        seconday: "#24232B",
        dark: "#18171F",
        "light-green": "#A4FFAF",
      },
    },
  },
  plugins: [],
};
