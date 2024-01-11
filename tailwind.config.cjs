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
        primary: "#00B728", // green
        secondary: "#B70000", // red
        thrith: "#FF8F3E", // orange
      },
      screens: {
        tl: "450px",
        telephone: "430px",
        specific: "860px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
