// import library
import axios, { AxiosError } from "axios";

// declare url variable
const url = import.meta.env.VITE_URL_DEV + "/guest";

// declare interface for errorResponse
interface errorResponse {
    message: string
}

interface successResponse {
    currentData:successResponseInside,
    recommend:successResponseInside[]
}

// declare interface for successResponse
interface successResponseInside {
    id:string
    name:string
    minplayers:number
    maxplayers:number
    minage:number
    playingtime:number
    yearpublished:number
    description:string
    image:string
}

export default async function RecommendGuestApi(boardgameName:string):Promise<successResponse | undefined | string> {
    try {
        const result = await axios({
            url:url,
            method:"get",
            params:{ boardgameName },
            timeout:20000
        })
        
        return result.data
    }catch(err:unknown | AxiosError) {
        if (axios.isAxiosError(err)) {
            console.log(err)
            const message:string = (err.response?.data as errorResponse).message

            if (message === "occurred error in server"){
                return "มีข้อผิดพลาดของเซิฟเวอร์"
            }
        }else {
            return "มีข้อผิดพลาดของบราวเซอร์"
        }
    }
}