/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "gridTemplateColumns": {
        "home": "200px 1fr",
      },
    },
  },
  plugins: [],
}