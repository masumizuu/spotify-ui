/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all files recursively in the src directory
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Replace the default sans-serif
      },
      gridTemplateAreas: {
        layout: [
          "header header header",
          "sidebar main right-sidebar",
          "footer footer footer",
        ],
      },
      gridTemplateColumns: {
        layout: "1fr 3fr 1.5fr", // Sidebar, Main Content, Right Sidebar
      },
      gridTemplateRows: {
        layout: "auto 1fr auto", // Header, Main Content, Footer
      },
    },
  },
  plugins: [require('daisyui')], // Add DaisyUI plugin
};


