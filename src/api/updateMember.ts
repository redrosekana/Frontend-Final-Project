// import library
import axios, { AxiosError } from "axios"

// declare url variable
const url = import.meta.env.VITE_URL_DEV + "/auth/member"

// declare interface for success
interface successResponse {
    message: string;
}
// declare interface for error
interface errorResponse extends successResponse {}

// declare body for update userMember
interface BodyUserMember {
    displayNameUser?:string | undefined
    email?:string | undefined
}

export default async function UpdateMember(body:BodyUserMember,token:string):Promise<string | undefined> {
    try {
        const patternToken:string = `Bearer ${token}`
        const result = await axios({
            url:`${url}`,
            method:"patch",
            data:body,
            headers:{Authorization:patternToken,"content-types":"application/json"},
            timeout:20000
        })
        return (result.data as successResponse).message
    }catch(err: unknown | AxiosError) {
        if (axios.isAxiosError(err)) {
            const message = (err.response?.data as errorResponse).message
            console.log(message)
            if (message === "must pass Bearer in front of token or haven't token"){
                return "รูปแบบการส่งไม่ถูกต้อง"
            }else if (message === "expired accessToken") {
                return "accessToken หมดอายุ"
            }else if (message === "unauthorization accessToken"){
                return "accessToken ไม่มีสิทธิเข้าถึง"
            }else if (message === "need least one field for update information"){
                return "ต้องการข้อมูลอย่างน้อย 1 ฟิลด์"
            }else if (message === "displayName repeated"){
                return "ชื่อแสดงในเว็บไซต์ ถูกใช้งานแล้ว"
            }else if (message === "email repeated"){
                return "ชื่ออีเมลล์ ถูกใช้งานแล้ว"
            }else if (message === "occurred error in server") {
                return "มีข้อผิดพลาดของเซิฟเวอร์"
            }     
        }else {
            console.log(err)
            return "มีข้อผิดพลาดของบราวเซอร์"
        }
    }
}