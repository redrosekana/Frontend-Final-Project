// import library
import axios, { AxiosError } from "axios"

// declare url variable
const url = import.meta.env.VITE_URL_DEV + "/auth/password"

// declare interface for success
interface successResponse {
    message: string;
}
// declare interface for error
interface errorResponse extends successResponse {}

export default async function UpdatePassword(oldPassword:string, newPassword:string, token:string):Promise<string | undefined> {
    try {
        const patternToken:string = `Bearer ${token}`
        const result = await axios({
            url:`${url}`,
            method:"post",
            data:{oldPassword,newPassword},
            headers:{Authorization:patternToken,"content-types":"application/json"},
            timeout:20000
        })
        
        return result.data
    }catch(err: unknown | AxiosError) {
        if (axios.isAxiosError(err)) {
            const message = (err.response?.data as errorResponse).message
           
            if (message === "must pass Bearer in front of token or haven't token"){
                return "รูปแบบการส่งไม่ถูกต้อง"
            }else if (message === "expired accessToken") {
                return "accessToken หมดอายุ"
            }else if (message === "unauthorization accessToken"){
                return "accessToken ไม่มีสิทธิเข้าถึง"
            }else if (message === "need password that will change"){
                return "ต้องการรหัสผ่านที่จะเปลี่ยน"
            }else if (message === "old password invalid"){
                return "รหัสผ่านเดิมไม่ถูกต้อง"
            }else if (message === "occurred error in server") {
                return "มีข้อผิดพลาดของเซิฟเวอร์"
            }     
        }else {
            console.log(err)
            return "มีข้อผิดพลาดของบราวเซอร์"
        }
    }
}