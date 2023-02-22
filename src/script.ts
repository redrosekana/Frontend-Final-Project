const apikey:string = import.meta.env.VITE_URL_APIKEY
const awesomekey:string = import.meta.env.VITE_URL_AWESOME

const headEl = document.querySelector("head")
const scriptLongoMapEl = document.createElement("script")
const scriptFontawsome = document.createElement("script")

scriptLongoMapEl.src = `https://api.longdo.com/map/?key=${apikey}`
scriptFontawsome.src = `https://kit.fontawesome.com/${awesomekey}.js`
scriptFontawsome.crossOrigin = "anonymous"

headEl?.appendChild(scriptLongoMapEl)

export {}



