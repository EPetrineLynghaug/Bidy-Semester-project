/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Inkluder HTML-filer i rotmappen
    "./src/**/*.{js,jsx,ts,tsx,html}", // Inkluderer alle filer i src-mappen
    "./profile/**/*.html", // HTML-filer i profile-mappen
    "./auth/**/*.html", // HTML-filer i auth-mappen
    "./listing/**/*.html", // HTML-filer i listing-mappen
  ],
  theme: {
    extend: {
      colors: {
        hoverGray: "#f5f5f5",
        textPrimary: "#333333",
        textSecondary: "#555555",
        linkColor: "#1565C0",
        primary: {
          DEFAULT: "#1565C0", // Blå farge
          hover: "#0D47A1", // Hover for detaljknappen
        },
        secondary: {
          DEFAULT: "#42A5F5", // Blåfarge nr 2
        },
        edit: {
          DEFAULT: "#5C9DED", // Edit farge
          hover: "#3B82F6", // Hover for edit-knappen
        },
        bidNow: {
          DEFAULT: "#28A745", // Bid now farge
          hover: "#388E3C", // Hover for bid now-knappen
        },
        delete: {
          DEFAULT: "#E53935", // Slett farge
          hover: "#D32F2F", // Hover for slett-knappen
        },
      },
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
      },
      lineHeight: {
        snug: "1.25",
        relaxed: "1.6",
      },
      fontWeight: {
        thin: "100",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"), // Plugin for tekstklipping
  ],
};
