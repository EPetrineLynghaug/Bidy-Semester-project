/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Inkluderer HTML-filer i rotmappen (f.eks., index.html)
    "./src/**/*.{js,jsx,ts,tsx,html}", // Inkluderer alle relevante filer i src-mappen
    "./profile/**/*.html", // Inkluderer alle HTML-filer i profile-mappen
    "./auth/**/**/*.html", // Inkluderer filer i auth-mappen hvis relevant
    "./auth/**/*.html", // Inkluderer filer i auth-mappen hvis relevant
    "./listing/**/*.html", // Inkluderer filer i listing-mappen hvis relevant
    // Legg til andre relevante mapper hvis nødvendig
  ],
  theme: {
    extend: {
      colors: {
        hoverGray: "#f5f5f5",
        textPrimary: "#333333",
        textSecondary: "#555555",
        linkColor: "#1565C0",
      },
      fontFamily: {
        sans: ["Satoshi", "sans-serif"], // Legg til Satoshi som sans font
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
