/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        roboto: ["Roboto"],
      },
      colors: {
        background: "#ffffff",
        darkGreen: "#283618",
        lightGreen: "#606C38",
      },
    },
  },
  plugins: [],
};
