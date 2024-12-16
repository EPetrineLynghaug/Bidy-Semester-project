/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Include HTML files in the root directory (e.g., index.html)
    "./src/**/*.{js,jsx,ts,tsx,html}", // Include all relevant files in the src folder
    "./profile/**/*.html", // Include all HTML files in the profile folder
    "./auth/**/*.html", // Include all HTML files in the auth folder
    "./listing/**/*.html", // Include all HTML files in the listing folder
    // Add additional folders or file patterns if necessary
  ],
  theme: {
    extend: {
      colors: {
        hoverGray: "#f5f5f5", // Subtle gray for hover effects
        textPrimary: "#333333", // Primary text color
        textSecondary: "#555555", // Secondary text color
        linkColor: "#1565C0", // Link and primary action color
        primary: {
          DEFAULT: "#1565C0", // Primary blue color
          hover: "#0D47A1", // Darker blue for hover states
        },
        secondary: {
          DEFAULT: "#42A5F5", // Secondary blue color
        },
        edit: {
          DEFAULT: "#5C9DED", // Blue for edit actions
          hover: "#3B82F6", // Hover state for edit buttons
        },
        bidNow: {
          DEFAULT: "#28A745", // Green for "Bid Now" actions
          hover: "#388E3C", // Hover state for "Bid Now" buttons
        },
        delete: {
          DEFAULT: "#E53935", // Red for delete actions
          hover: "#D32F2F", // Hover state for delete buttons
        },
      },
      fontFamily: {
        sans: ["Satoshi", "sans-serif"], // Custom font family
      },
      lineHeight: {
        snug: "1.25", // Tighter line height for better spacing
        relaxed: "1.6", // Relaxed line height for readable content
      },
      fontWeight: {
        thin: "100", // Ultra-thin font weight
      },
      zIndex: {
        9999: "9999", // Add z-9999 for modals or high-priority elements
        max: "2147483647", // Add max z-index for absolute top-level elements
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"), // Plugin for text truncation
  ],
};
