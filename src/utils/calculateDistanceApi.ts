// import library
import axios from "axios";

// env variable
const VITE_URL_APIKEY: string = import.meta.env.VITE_URL_APIKEY;

async function CalculateDistanceApi(
  sourceAddress: string,
  destinationAddress: string,
  sourceLatitude: number,
  sourceLongitude: number,
  destinationLatitude: number,
  destinationLongitude: number,
  destinationProvince: string,
  destinationTel: string,
  destinationContact: string
) {
  try {
    const url = `https://api.longdo.com/RouteService/json/route/guide?flon=${sourceLongitude}&flat=${sourceLatitude}&tlon=${destinationLongitude}&tlat=${destinationLatitude}&mode=d&type=127&restrict=0&locale=th&key=${VITE_URL_APIKEY}&maxresult=1`;
    const result = await axios.get(url, {
      timeout: 30000,
    });

    const data = {
      distance: result.data.data[0].distance,
      sourceAddress: sourceAddress,
      destinationAddress: destinationAddress,
      sourceLatitude: result.data.meta.from.lat,
      sourceLongitude: result.data.meta.from.lon,
      destinationLatitude: result.data.meta.to.lat,
      destinationLongitude: result.data.meta.to.lon,
      destinationProvince: destinationProvince,
      destinationTel: destinationTel,
      destinationContact: destinationContact,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
}

export { CalculateDistanceApi };
