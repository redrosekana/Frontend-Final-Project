// import library
import axios , { AxiosError } from "axios"

// import apikey from env
const apikey:string = import.meta.env.VITE_URL_APIKEY

// declare interface for parameter of function
interface InformationEntrieShops {
	source:string
	destination:string
	flon:number
	flat:number
	tlon:number
	tlat:number
	distance:number
}

export default async function CalculateDistance(source:string , destination:string , flon:number , flat:number , tlon:number , tlat:number):Promise<InformationEntrieShops | undefined | string> {
    try {
        const url = `https://api.longdo.com/RouteService/geojson/route?flon=${flon}&flat=${flat}&tlon=${tlon}&tlat=${tlat}&mode=d&type=17&locale=th&key=${apikey}`
        const result = await axios.get(url,{
            timeout:20000
        })
        
        const resultActually:InformationEntrieShops = {
            source:source,
            destination:destination,
            flon:result.data.meta.from.lon,
            flat:result.data.meta.from.lat,
            tlon:result.data.meta.to.lon,
            tlat:result.data.meta.to.lat,
            distance:result.data.data.distance
        }

        return resultActually
    } catch (err:unknown | AxiosError) {
        if (axios.isAxiosError(err)) {
            return "มีข้อผิดพลาดของเซิฟเวอร์"
        }else {
            return "มีข้อผิดพลาดของบราวเซอร์"
        }
    }
}