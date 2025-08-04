/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      outline: {
        ring: ['2px solid var(--ring)', '2px'],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#007BDB", // Campus Rank Primary Blue
          foreground: "#FFFFFF", // Text on Primary
        },
        secondary: {
          DEFAULT: "#3EBE82", // Campus Rank Green
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#E5E7EB",
          foreground: "#6B7280",
        },
        accent: {
          DEFAULT: "#00B3E3", // Light Blue Accent
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#F9FAFB",
          foreground: "#111827",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1F2937",
        },
        campus: {
          blue: "#007BDB",
          lightBlue: "#00B3E3",
          green: "#3EBE82",
          darkTeal: "#1D7864",
          lightTeal: "#3EC7A0",
          white: "#FFFFFF",
          bg: "#1F2C45",
          bgDark: "#162135",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s ease-in-out infinite'
      },
      backgroundImage: {
        'campus-gradient': 'linear-gradient(135deg, #1F2C45, #162135)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
