const VITE_URL_APIKEY: string = import.meta.env.VITE_URL_APIKEY;
const VITE_URL_AWESOME: string = import.meta.env.VITE_URL_AWESOME;

const headEl = document.querySelector("head");
const scriptLongoMapEl = document.createElement("script");
const scriptFontawsome = document.createElement("script");

scriptLongoMapEl.src = `https://api.longdo.com/map/?key=${VITE_URL_APIKEY}`;
scriptFontawsome.src = `https://kit.fontawesome.com/${VITE_URL_AWESOME}.js`;
scriptFontawsome.crossOrigin = "anonymous";

headEl?.appendChild(scriptLongoMapEl);
headEl?.appendChild(scriptFontawsome);

export {};
