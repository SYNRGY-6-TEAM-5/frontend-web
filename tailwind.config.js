const Warning = require('postcss/lib/warning');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      screens: {
        xs: "425px",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        wiggle: "wiggle 200ms ease-in-out",
      },
      colors: {
        primary: {
          50: "#FEEBE6",
          100: "#FDD7CE",
          200: "#FBAE9D",
          500: "#F74E28",
        },
        black: "#111111",
        gray: {
          50: "#F9F9FB",
          100: "#EFF1F5",
          200: "#DCDFEA",
          300: "#B9C0D4",
          400: "#7D89B0",
          500: "#5D6B98",
          700: "#404968",
        },
        white: "#fff",
        zinc:{
          900: "#18181b",
        },
        error: {
          50: "#FEF3F2",
          100: "#FEE4E2",
          500:"#F04438",
        },
        warning: {
          500: "#F79009",
        },
        success : {
          500: "#12B76A"
        }
      },
      boxShadow: {
        '3xl':'0px 4px 4px rgba(0, 0, 0, 0.04)',
        '4xl':'0px -4px 4px rgba(0, 0, 0, 0.04)',
      },
    },
    backgroundImage: {
      "login-bg": "url('/src/assets/login-bg.png')",
      "register-bg": "url('/src/assets/register-bg.png')",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
