// import library
import axios , {AxiosError} from "axios";

// declare url variable
const url = import.meta.env.VITE_URL_DEV + "/popular"

// declare interface
interface responseSuccess {
    name:string
    picture:string
    year:string
    id:string
}

export default async function PopularBoardgameApi():Promise<string | undefined | responseSuccess[]> {
    try {
        const result = await axios({
            url:url,
            method:"get",
            timeout:20000
        })
        
        return result.data
    }catch(err: unknown | AxiosError) {
        if (axios.isAxiosError(err)) {
            console.log(err)
            return "มีข้อผิดพลาดของเซิฟเวอร์"
        }else {
            return "มีข้อผิดพลาดของบราวเซอร์"
        }
    }
}