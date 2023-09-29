// import library
import axios, { AxiosError } from "axios";

// env variable
const VITE_URL_APIKEY: string = import.meta.env.VITE_URL_APIKEY;

async function CalculateDistanceApi(
  sourceAddress: string,
  destinationAddress: string,
  sourceLongitude: number,
  sourceLatitude: number,
  destinationLongitude: number,
  destinationLatitude: number
) {
  try {
    const url = `https://api.longdo.com/RouteService/geojson/route?flon=${sourceLongitude}&flat=${sourceLatitude}&tlon=${destinationLongitude}&tlat=${destinationLatitude}&mode=d&type=17&locale=th&key=${VITE_URL_APIKEY}`;
    const result = await axios.get(url, {
      timeout: 30000,
    });

    const data = {
      distance: result.data.data.distance,
      sourceAddress: sourceAddress,
      destinationAddress: destinationAddress,
      sourceLongitude: result.data.meta.from.lon,
      sourceLatitude: result.data.meta.from.lat,
      destinationLongitude: result.data.meta.to.lon,
      destinationLatitude: result.data.meta.to.lat,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
}

export { CalculateDistanceApi };
