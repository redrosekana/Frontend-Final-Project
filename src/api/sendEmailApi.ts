//* import library
import axios, { AxiosError } from "axios";

//* declare instance
const url = import.meta.env.VITE_URL_DEV + "/email";

//* declare interface
interface errorResponse {
    message:string
}

export default async function SendEmailApi(email:string):Promise<string | undefined> {
    try {
        await axios({
            url:url,
            method:"post",
            data:{email:email},
            headers:{"content-type":"application/json"},
            timeout:5000
        })

        return "ส่งข้อมูลไปในอีเมล์ของคุณแล้ว" + "\n" + "กรุณาตรวจสอบด้วยครับ"
    }catch(err: unknown | AxiosError) {
        if (axios.isAxiosError(err)) {
            console.log(err)
            const message = ( err.response?.data as errorResponse ).message

            if (message === "don't exist a user email in the database") {
                return "ไม่มีอีเมลล์ของผู้ใช้งานนี้"
            }else if (message === "require a user email"){
                return "โปรดกรอกอีเมลล์ของคุณ"
            }else if (message === "invalid email format") {
                return "กรุณาระบุรูปแบบของอีเมลล์ให้ถูกต้อง"
            }else if (message === "occur error make to can't send email" || message === "occur error in server"){
                return "มีข้อผิดพลาดของเซิฟเวอร์"
            }
        }else {
            return "มีข้อผิดพลาดของบราวเซอร์"
        }
    }
}