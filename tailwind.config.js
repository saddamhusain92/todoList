module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
       "at-light-green": "#44ba9f",
      "at-green": "#286d5d",
      "light-grey": "#f1f1f1",
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'blue': '#60a5fa',
      'orange': '#f97316',
      'indigo': '#818cf8',
      'pink': '#ec4899',
      'rose': '#f43f5e',
      'sky': '#f0f9ff',
      'cyan': '#06b6d4',
      'teal': '#14b8a6',
      'violet': '#8b5cf6',
      },
    },
    fontFamily: {
      Poppins: ["Poppins, sans-serif"],
    },
    flex: {
      "1": "1 1 0%",
      "2": "2 2 0%",
    },
    container: {
      center: true,
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
