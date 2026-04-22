/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Professional Dark Theme
        dark: {
          bg: "#050505",
          surface: "#0d0d0d",
          border: "#1f1f1f",
          text: "#f5f5f5",
          muted: "#5a5a5a",
          secondary: "#b0b0b0",
        },
        
        // Primary Accent - Emerald/Green for creative projects
        accent: {
          50: "#f0fdf4",
          100: "#dcfce7",
          300: "#86efac",
          400: "#22c55e",
          500: "#16a34a",
        },
        
        // Secondary Accent for variety
        brand: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
      },

      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
            transform: "scale(.95)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
    },
  },

  plugins: [],
}
