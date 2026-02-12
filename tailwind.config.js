export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#013550",
        accent: "#00b6c6",
        darkGrey: "#2f2f2f",
        lightGrey: "#dcdcdc",
        offWhite: "#efefef",
        black: "#000000",
      },
      fontFamily: {
        sans: ["Product Sans", "sans-serif"], // your global font
      },
    },
  },
  plugins: [],
};
