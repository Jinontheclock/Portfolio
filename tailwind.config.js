/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mobile: "0px",      // ≤640px 사용 시 @media (min-width: 0)
      tablet: "641px",    // 641–1024px
      desktop: "1025px",  // ≥1025px
    },
  },
  plugins: [],
};
