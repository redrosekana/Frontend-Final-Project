// import library
import axios, { AxiosError } from "axios";

// declare url variable
const url = import.meta.env.VITE_URL_DEV + "/information";

// declare interface for errorResponse
interface errorResponse {
    message: string
 }

export default async function InformationBoardGameApi():Promise<string[] | undefined | string> {
    try {
        const result = await axios({
            url:url,
            method:"get",
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