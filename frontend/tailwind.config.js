/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#fff",
        secondary: "#f0f2f5",
        third: "#e4e6eb",
        forth: "#f0f2f5",
      },
      colors: {
        primary: "#050505",
        secondary: " #65676b",
        blue: "#0f90f3",
      },
    },
  },
  plugins: [],
}
