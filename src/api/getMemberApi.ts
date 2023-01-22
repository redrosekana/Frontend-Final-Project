import axios, { AxiosError } from "axios";

const url = import.meta.env.VITE_URL_DEV;

interface successResponseOne {
      message: string;
      displayName:string;
      username:string;
      email:string
}

interface successResponseTwo {
      message: string;
      displayName:string;
      facebookId:string;
      facebookName:string
}

interface errorResponse {
      message: string;
}

export default async function GetMemberApi(token:string,path:string):Promise<string | undefined | successResponseOne | successResponseTwo> {
      try {

            const patternToken:string = `Bearer ${token}`
            const result = await axios({
                  url:`${url}${path}`,
                  method:"get",
                  headers:{"Authorization":patternToken},
                  timeout:5000
            })

            return result.data
      }catch(err: unknown | AxiosError) {
            if (axios.isAxiosError(err)) {
                  const message = (err.response?.data as errorResponse).message
                  console.log(message)
                  if (message === "must pass Bearer in front of token or haven't token"){
                        return "รูปแบบการส่งไม่ถูกต้อง"
                  }else if (message === "expired accessToken") {
                        return "accessToken หมดอายุ"
                  }else if (message === "expired refreshToken") {
                        return "refreshToken หมดอายุ"
                  }else if (message === "unauthorization accessToken"){
                        return "accessToken ไม่มีสิทธิเข้าถึง"
                  }else if (message === "unauthorization refreshToken"){
                        return "refreshToken ไม่มีสิทธิเข้าถึง"
                  }else if (message === "occurred error in server") {
                        return "มีข้อผิดพลาดของเซิฟเวอร์"
                  }     
            }else {
                  console.log(err)
                  return "มีข้อผิดพลาดของบราวเซอร์"
            }
      }
}