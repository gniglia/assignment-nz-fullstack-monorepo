/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          900: "#111827",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["24px", { fontWeight: "700" }],
        h2: ["20px", { fontWeight: "600" }],
        h3: ["18px", { fontWeight: "500" }],
        body: ["14px", { fontWeight: "400" }],
        caption: ["12px", { fontWeight: "400" }],
      },
      spacing: {
        component: "24px",
        section: "32px",
        base: "4px",
      },
      maxWidth: {
        search: "320px",
      },
      height: {
        icon: "24px",
      },
      width: {
        icon: "24px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "card-hover":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      screens: {
        mobile: "320px",
        tablet: "768px",
        desktop: "1024px",
      },
    },
  },
  plugins: [],
};
