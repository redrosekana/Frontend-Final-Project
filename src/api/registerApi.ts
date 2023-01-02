//* import library
import axios, { AxiosError } from "axios";

//* declare instance
const url = import.meta.env.VITE_URL_DEV + "/register";

//* declare interface
interface RegisterMember {
  displayName: string;
  username: string;
  password: string;
  email: string;
}

interface errorResponse {
  message: string;
}

export default async function RegisterApi( body: RegisterMember ): Promise<string | undefined> {
  try {
    await axios({
      url: url,
      method: "post",
      data: body,
      timeout: 5000,
    });

    return "สมัครเสร็จสิ้น ระบบจะนำไปยังหน้าเข้าสู่ระบบ";
  } catch (err: unknown | AxiosError) {
    if (axios.isAxiosError(err)) {
      const message = (err.response?.data as errorResponse).message;
      if (message === "need additnal information") {
        return "ใส่ข้อมูลไม่ครบ";
      } else if (message === "displayName repeated") {
        return "ชื่อแสดงในเว็บไซต์ ถูกใช้งานแล้ว";
      } else if (message === "username repeated") {
        return "ชื่อผู้ใช้งาน ถูกใช้งานแล้ว";
      } else if (message === "email repeated") {
        return "อีเมลล์ ถูกใช้งานแล้ว";
      } else if (message === "occurred error in server") {
        return "มีข้อผิดพลาดของเซิฟเวอร์";
      }
    } else {
      console.log(err);
      return "มีข้อผิดพลาดของบราวเซอร์";
    }
  }
}
