// import library
import axios, { AxiosError } from "axios";

// declare instance
const url = import.meta.env.VITE_URL_DEV + "/email";

// declare interface
interface errorResponse {
    message:string
}

export default async function CheckValidToken(token:string):Promise<string | undefined> {
    try {
        await axios({
            url:url,
            method:"get",
            params:{token:token},
            timeout:20000
        })

        return "ทำการยืนยันตัวตนสำเร็จ"
    }catch(err: unknown | AxiosError) {
        if (axios.isAxiosError(err)) {
            const message = ( err.response?.data as errorResponse ).message
            console.log(message)
            
            if (message === "jwt expired token") {
                return "โทเคนหมดอายุแล้ว กรุณาทำการใหม่อีกครั้ง"
            }else if (message === "invalid signature" || message === "jwt malformed") {
                return "ต้องดำเนินการภายในอีเมลล์ที่ส่งข้อมูลไปเท่านั้น"
            }else {
                return "มีข้อผิดพลาดของเซิฟเวอร์"
            }
        }else {
            console.log(err)
            return "มีข้อผิดพลาดของบราวเซอร์"
        }
    }
}