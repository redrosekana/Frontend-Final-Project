//* import library
import React, { useRef } from "react";
import { useNavigate, NavigateFunction, NavLink } from "react-router-dom";

//* import function api
import LoginApi from "../api/loginApi";

//* import controller
import { createSwal } from "../controller/createSwal";

//* declare interface and instance
interface LoginMember {
  username: string;
  password: string;
}

const url = import.meta.env.VITE_URL_DEV + "/facebookMember";

export default function Login() {
  const navigate: NavigateFunction = useNavigate();
  const usernameEl = useRef<HTMLInputElement>(null);
  const passwordEl = useRef<HTMLInputElement>(null);

  const submitBtn = async (ev: React.MouseEvent) => {
    const body: LoginMember = {
      username: usernameEl.current!.value.trim(),
      password: passwordEl.current!.value.trim(),
    };

    if (!usernameEl.current?.value.trim() || !passwordEl.current?.value.trim()) {
      createSwal("แจ้งเตือน", "โปรดกรอกข้อมูลให้ครบ", "warning", "#ec9e18");
      return
    }

    const result = await LoginApi(body);

    if (
      result === "ต้องใส่ข้อมูลให้ครบ" ||
      result === "ไม่มีชื่อผู้ใช้งานนี้ในระบบ"
    ) {
      createSwal("แจ้งเตือน", result, "warning", "#ec9e18");
    } else if (
      result === "มีข้อผิดพลาดของเซิฟเวอร์" ||
      result === "มีข้อผิดพลาดของบราวเซอร์" ||
      result === "รหัสผ่านไม่ถูกต้อง"
    ) {
      createSwal("เกิดข้อผิดพลาด", result, "error", "#e10000");
    } else if (result === "เข้าสู่ระบบเสร็จสิ้น ระบบจะนำไปยังหน้าหลัก") {
      createSwal("สำเร็จ", result, "success", "#06b400").then(() => {
        navigate("/page/home");
      });
    }
  };

  return (
    <main className="container max-w-7xl min-h-screen mx-auto flex justify-center items-center">
      <div
        className="max-w-2xl w-full p-5 sm:p-0"
      >
        <h1 className="text-[1.8rem] font-bold text-center mb-10 telephone:text-[2.2rem] sm:text-[3rem]">
          Board Game Recommu
        </h1>

        <div className="mb-4">
          <input
            type="text"
            id="username"
            className="bg-slate-50  border border-gray-200 text-gray-700 text-base rounded-lg focus:ring-gray-400 focus:border-gray-400 w-full p-4"
            placeholder="ชื่อผู้ใช้งาน (username)"
            required
            ref={usernameEl}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            id="password"
            className="bg-slate-50  border border-gray-200 text-gray-700 text-base rounded-lg focus:ring-gray-400 focus:border-gray-400 w-full p-4"
            placeholder="รหัสผ่าน (password)"
            required
            ref={passwordEl}
          />
        </div>
        
        <button
          onClick={(ev) => submitBtn(ev)}
          className="text-white bg-limegreen shadow-lg shadow-green-200  hover:bg-green-600 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full telephone:w-auto px-5 py-2 text-center"
        >
          เข้าสู่ระบบ
        </button>
        
        <button
          className="text-white bg-blue-500 shadow-lg shadow-blue-200  hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full telephone:w-auto px-5 py-2 text-center mt-3 telephone:ml-2 telephone:mt-0"
          onClick={() => {
            window.location.href = `${url}`
          }}
        >
          facebook
        </button>
      </div>
    </main>
  );
}
