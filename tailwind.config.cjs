module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors:{
        "redrose":"#B70000",
        "limegreen":"#00B728",
        "orangey":"#FF8F3E"
      },
      screens:{
        telephone:"430px",
        specific:"860px"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}