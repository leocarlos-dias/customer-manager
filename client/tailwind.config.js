/** @type {import("tailwindcss").Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      circle: ["Flow Circular", "cursive"],
    },
    extend: {
      screens: {
        esm: "512px",
      },
      gridTemplateColumns: {
        "manual-3": "1.3fr 1.5fr 2fr",
        "manual-5": "1.3fr 1.1fr 0.8fr 0.8fr 2fr",
      },
      keyframes: {
        jello: {
          "0%": {
            "-webkit-transform": "scale3d(1, 1, 1)",
            transform: "scale3d(1, 1, 1)",
          },
          "30%": {
            "-webkit-transform": "scale3d(1.25, 0.75, 1)",
            transform: "scale3d(1.25, 0.75, 1)",
          },
          "40%": {
            "-webkit-transform": "scale3d(0.75, 1.25, 1)",
            transform: "scale3d(0.75, 1.25, 1)",
          },
          "50%": {
            "-webkit-transform": "scale3d(1.15, 0.85, 1)",
            transform: "scale3d(1.15, 0.85, 1)",
          },
          "65%": {
            "-webkit-transform": "scale3d(0.95, 1.05, 1)",
            transform: "scale3d(0.95, 1.05, 1)",
          },
          "75%": {
            "-webkit-transform": "scale3d(1.05, 0.95, 1)",
            transform: "scale3d(1.05, 0.95, 1)",
          },
          "100%": {
            "-webkit-transform": "scale3d(1, 1, 1)",
            transform: "scale3d(1, 1, 1)",
          },
        },
        opacity: {
          "0%": { opacity: 0, scale: 0 },
          "20%": { opacity: 0, scale: 0 },
          "40%": { opacity: 0.3, scale: 0.3 },
          "60%": { opacity: 0.5, scale: 0.5 },
          "80%": { opacity: 0.9, scale: 0.9 },
          "100%": { opacity: 1, scale: 1 },
        },
        nudge: {
          "0%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(150px,0)" },
          "80%": { transform: "translate(-150px,0)" },
          "100%": { transform: "translate(0,0)" },
        },
      },
      animation: {
        opacity: "opacity 0.5s ease-in-out forwards 1.0s",
        jello: "jello 1s both 0.5s",
        nudge: "nudge 5s linear infinite alternate",
      },
      backgroundSize: {
        140: "140%",
      },
    },
  },
};
