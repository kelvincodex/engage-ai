/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'user-modal-gradient': 'linear-gradient(to bottom, rgba(120, 197, 82, 1), rgba(100, 187, 255, 1))',
        'sidebar-gradient': 'linear-gradient(to bottom, rgba(252, 252, 252, 1), rgba(245, 244, 249, 1))',
      },
      transitionProperty:{
        'left': 'left'
      },
      fontFamily: {
        sans: ['switzer', ...defaultTheme.fontFamily.sans],
        'poppins': 'poppins',
        'spacegrotest': 'spacegrotest',
        'switzer': 'switzer'
      },
      colors:{
        "primary-color": "var(--primary-color)",
        "primary-lighter-color": "var(--primary-lighter-color)",
        "beam-gray-color": "var(--beam-gray-color)",
        "brand-darker-color": "var(--brand-darker-color)",
        "neutral-light-color": "var(--neutral-light-color)",
        "neutral-darker-color": "var(--neutral-darker-color)",
        "normal-color": "var(--normal-color)",
        "neutral-soft-color": "var(--neutral-soft-color)",
        "yellow-light-color": "var(--yellow-light-color)",
        "yellow-darker-color": "var(--yellow-darker-color)",
        "green-darker-color": "var(--green-darker-color)",
        "green-color": "var(--green-color)",
        "green-light-color": "var(--green-light-color)",
        "red-light-color": "var(--red-light-color)",
        "red-darker-color": "var(--red-darker-color)",
        "neutral-lighter-color": "var(--neutral-lighter-color)",
        "neutral-dark-color": "var(--neutral-dark-color)",
      }
    },
  },
  plugins: [typography,forms({strategy:'class'}),require("tailgrids/plugin")],
}