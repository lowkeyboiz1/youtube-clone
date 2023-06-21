/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { transform: "translateX(-240px)" },
          "100%": { transform: "translateX(0px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};
