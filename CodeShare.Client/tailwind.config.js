/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "c-sharp-50": "#91c890",
        "c-sharp-100": "#7bbd79",
        "c-sharp-200": "#65b263",
        "c-sharp-300": "#4fa74d",
        "c-sharp-400": "#399c36",
        "c-sharp": "#239120",
        "c-sharp-600": "#20831d",
        "c-sharp-700": "#1c741a",
        "c-sharp-800": "#196616",
        "c-sharp-900": "#155713",

        "dark-1000": "#060606",
        "dark-975": "#090909",
        "dark-950": "#0c0c0c",
        "dark-925": "#0f0f0f",
        "dark-900": "#121212",
        "dark-800": "#151515",
        "dark-700": "#181818",
        "dark-500": "#1b1b1b",
        "dark-400": "#1e1e1e",
        "dark-300": "#353535",
        "dark-200": "#4b4b4b",
        "dark-100": "#626262",
        "dark-50": "#787878",
        "dark-25": "#8f8f8f",

        "disabled-bg": "#4b5154",
        "disabled-color": "#9e9689",
        "visual-studio-bg": "#1e1e1e"
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(190%)" }
        }
      },
      animation: {
        "spin-slow": "spin 1.5s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
