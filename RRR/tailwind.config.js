/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx", "./src/**/*.js", "./src/**/*.ts", "./src/**/*.tsx", "./src/**/*.md"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}

