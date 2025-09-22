/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#eff6ff" /* Primary Blue 50 - lighter shade for backgrounds */,
          100: "hsl(var(--primary-100))" /* Primary Blue Light from PRD */,
          500: "hsl(var(--primary))" /* Primary Blue from PRD */,
          600: "#2563eb" /* Used in Button component */,
          700: "hsl(var(--primary-700))" /* Primary Blue Dark from PRD */,
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: "hsl(var(--success))" /* Success from PRD */,
        warning: "hsl(var(--warning))" /* Warning from PRD */,
        error: "hsl(var(--error))" /* Error from PRD */,
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gray: {
          50: "hsl(var(--background))" /* Gray scale from PRD */,
          100: "hsl(var(--secondary))",
          200: "#e5e7eb",
          300: "hsl(var(--border))",
          400: "#9ca3af",
          500: "hsl(var(--muted-foreground))",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937" /* Used in various components */,
          900: "hsl(var(--foreground))" /* Gray scale from PRD */,
        },
        blue: {
          50: "#eff6ff" /* Used for status badges */,
          100: "#dbeafe" /* Used for status badges */,
          500: "#3b82f6" /* Used for loading spinners */,
          600: "#2563eb" /* Used for loading spinners */,
          800: "#1e40af" /* Used for status badges */,
        },
        green: {
          100: "#dcfce7" /* Used for status badges */,
          600: "#16a34a" /* Used for success states */,
          800: "#166534" /* Used for status badges */,
        },
        red: {
          50: "#fef2f2" /* Used for hover states */,
          100: "#fee2e2" /* Used for status badges */,
          300: "#fca5a5" /* Used for input borders */,
          500: "#ef4444" /* Used for destructive actions */,
          600: "#dc2626" /* Used for destructive actions */,
          700: "#b91c1c" /* Used for destructive actions */,
          800: "#991b1b" /* Used for status badges */,
        },
        yellow: {
          100: "#fef3c7" /* Used for status badges */,
          800: "#92400e" /* Used for status badges */,
        },
        purple: {
          100: "#e9d5ff" /* Used in UserCard component */,
          800: "#6b21a8" /* Used in UserCard component */,
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["20px", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["18px", { lineHeight: "1.4", fontWeight: "500" }],
        body: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "400" }],
      },
      spacing: {
        component: "24px" /* Component padding from PRD */,
        section: "32px" /* Section margins from PRD */,
        base: "4px" /* Base unit from PRD */,
        card: "24px" /* Card padding from PRD */,
      },
      maxWidth: {
        search: "320px" /* Search bar max width from PRD */,
      },
      height: {
        icon: "24px" /* Icons 24px from PRD */,
      },
      width: {
        icon: "24px" /* Icons 24px from PRD */,
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" /* Default card shadow */,
        "card-hover":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" /* Hover card shadow */,
      },
      screens: {
        mobile: "320px" /* Mobile: 320–768px from PRD */,
        tablet: "768px" /* Tablet: 768–1024px from PRD */,
        desktop: "1024px" /* Desktop: 1024px+ from PRD */,
      },
      padding: {
        header: "1rem" /* Header py-4 from PRD */,
        main: "24px" /* Main content padding 24px from PRD */,
      },
    },
  },
  plugins: [],
};
