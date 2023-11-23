module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redrose: "#B70000",
        limegreen: "#00B728",
        orangey: "#FF8F3E",
        primary: "#B70000", // green
        secondary: "#B70000", // red
        thrid: "#FF8F3E", // orange
      },
      screens: {
        telephone: "430px",
        specific: "860px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
