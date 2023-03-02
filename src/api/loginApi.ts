// import library
import axios, { AxiosError } from "axios"
import Cookies from "universal-cookie"

// declare url variable
const cookie = new Cookies()
const url = import.meta.env.VITE_URL_DEV + "/login"

// declare interface for LoginMember
interface LoginMember {
   username: string
   password: string
}

// declare interface for successResponse
interface successResponse {
   message: string;
   accessToken: string
   refreshToken: string
}

// declare interface for errorResponse
interface errorResponse {
   message: string
}

export default async function LoginApi( body: LoginMember ): Promise<string | undefined> {
   try {
      const response = await axios({
         url: url,
         method: "post",
         data: body,
         timeout: 20000,
      })

      const result = response.data as successResponse;
      cookie.set("accessToken", result.accessToken, { path: "/" })
      cookie.set("refreshToken", result.refreshToken, { path: "/" })

      return "เข้าสู่ระบบเสร็จสิ้น ระบบจะนำไปยังหน้าหลัก";
   } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
         const message:string = (err.response?.data as errorResponse).message
         console.log(message)
         
         if (message === "need input username and password"){
            return "ต้องใส่ข้อมูลให้ครบ"
         } else if (message === "don't exist user in database"){
            return "ไม่มีชื่อผู้ใช้งานนี้ในระบบ"
         } else if (message === "password invalid"){
            return "รหัสผ่านไม่ถูกต้อง"
         } else if (message === "occurred error in server"){
            return "มีข้อผิดพลาดของเซิฟเวอร์"
         }
      }else{
         console.log(err)
         return "มีข้อผิดพลาดของบราวเซอร์"
      }
   }
}
