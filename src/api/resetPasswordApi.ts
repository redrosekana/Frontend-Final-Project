// import library
import axios, { AxiosError } from "axios";

// declare url variable
const url = import.meta.env.VITE_URL_DEV + "/password";

// declare interface for errorResponse
interface errorResponse {
    message:string
}

interface bodyProps {
    password:string,
    token:string
}

export default async function ResetPasswordApi(body:bodyProps) {
    try {
        await axios({
            url:url,
            method:"post",
            headers:{"content-type":"application/json"},
            data:body,
            timeout:20000
        })
        
        return "เปลี่ยนรหัสผ่านสำเร็จ"
    }catch(err: unknown | AxiosError) {
        if (axios.isAxiosError(err)) {
            const message = ( err.response?.data as errorResponse ).message
            console.log(message)

            if (message === "need password and token") {
                return "ข้อมูลไม่ถูกต้อง"
            }else if (message === "jwt expired token") {
                return "โทเคนหมดอายุแล้ว กรุณาทำการใหม่อีกครั้ง"
            }else if (message === "occurred error in server") {
                return "มีข้อผิดพลาดของเซิฟเวอร์"
            }
        }else {
            return "มีข้อผิดพลาดของบราวเซอร์"
        }
    }
}