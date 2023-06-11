/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: withOpacity("--color-primary-100"),
          200: withOpacity("--color-primary-200"),
          300: withOpacity("--color-primary-300"),
          400: withOpacity("--color-primary-400"),
          500: withOpacity("--color-primary-500"),
          600: withOpacity("--color-primary-600"),
          700: withOpacity("--color-primary-700"),
          800: withOpacity("--color-primary-800"),
          900: withOpacity("--color-primary-900"),
        },
        secondary: {
          100: withOpacity("--color-secondary-100"),
          200: withOpacity("--color-secondary-200"),
          300: withOpacity("--color-secondary-300"),
          400: withOpacity("--color-secondary-400"),
          500: withOpacity("--color-secondary-500"),
          600: withOpacity("--color-secondary-600"),
          700: withOpacity("--color-secondary-700"),
          800: withOpacity("--color-secondary-800"),
          900: withOpacity("--color-secondary-900"),
        },
        success: withOpacity("--color-success"),
        warning: withOpacity("--color-warning"),
        error: withOpacity("--color-error"),
      },
      fontFamily: {
        sans: ["var(--font-vazir)", ...fontFamily.sans],
      },
      container: {
        center: true,
      },
      boxShadow: {
        "input-focus": "0 12px 24px -8px rgb(var(--color-primary-300))",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
