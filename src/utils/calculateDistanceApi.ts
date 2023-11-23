import axios from "axios";

// utils
import { VITE_URL_APIKEY } from "./getEnv";

// types
import { InformationEntrieShopOnlySearchItemPage } from "../pages/ProtectRoutes/Map/types/SearchMapType";

// global types
import { InformationEntrieShop } from "../types/informationEntrieShopTypes";

async function CalculateDistanceApi({
  sourceAddress,
  destinationAddress,
  sourceLatitude,
  sourceLongitude,
  destinationLatitude,
  destinationLongitude,
  destinationProvince,
  destinationTel,
  destinationContact,
}: InformationEntrieShopOnlySearchItemPage): Promise<InformationEntrieShop> {
  try {
    const url: string = `https://api.longdo.com/RouteService/json/route/guide?flon=${sourceLongitude}&flat=${sourceLatitude}&tlon=${destinationLongitude}&tlat=${destinationLatitude}&mode=d&type=127&restrict=0&locale=th&key=${VITE_URL_APIKEY}&maxresult=1`;
    const result = await axios.get(url, {
      timeout: 30000,
    });

    return {
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
  } catch (error) {
    throw error;
  }
}

export { CalculateDistanceApi };
