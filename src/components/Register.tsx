//* import library
import React, { useRef } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

//* import fucntion api
import RegisterApi from "../api/registerApi";

//* import controller
import { createSwal } from "../controller/createSwal";

//* declare interface
interface RegisterMember {
  displayName: string;
  username: string;
  password: string;
  email: string;
}

export default function Register() {
  const navigate: NavigateFunction = useNavigate();

  const displayNameEl = useRef<HTMLInputElement>(null);
  const usernameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const passwordEl = useRef<HTMLInputElement>(null);
  const confirm_passwordEl = useRef<HTMLInputElement>(null);

  const submitBtn = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (passwordEl.current?.value !== confirm_passwordEl.current?.value) {
      createSwal("แจ้งเตือน", "โปรดใส่รหัสผ่านให้ตรงกัน", "warning", "#ec9e18");
      return;
    }

    const body: RegisterMember = {
      displayName: displayNameEl.current!.value.trim(),
      username: usernameEl.current!.value.trim(),
      email: emailEl.current!.value.trim(),
      password: passwordEl.current!.value.trim(),
    };

    const result = await RegisterApi(body);
    if (
      result === "ชื่อแสดงในเว็บไซต์ ถูกใช้งานแล้ว" ||
      result === "ชื่อผู้ใช้งาน ถูกใช้งานแล้ว" ||
      result === "อีเมลล์ ถูกใช้งานแล้ว" ||
      result === "ใส่ข้อมูลไม่ครบ"
    ) {
      createSwal("แจ้งเตือน", result, "warning", "#ec9e18");
    } else if (
      result === "มีข้อผิดพลาดของเซิฟเวอร์" ||
      result === "มีข้อผิดพลาดของบราวเซอร์"
    ) {
      createSwal("เกิดข้อผิดพลาด", result, "error", "#e10000");
    } else if (result === "สมัครเสร็จสิ้น ระบบจะนำไปยังหน้าเข้าสู่ระบบ") {
      createSwal("สำเร็จ", result, "success", "#06b400").then(() => {
        navigate("/login");
      });
    }
  };

  return (
    <main className="container max-w-6xl mx-auto">
      <form
        className="max-w-xl mx-auto py-8 p-5 sm:px-0"
        onSubmit={(ev) => submitBtn(ev)}
      >
        <h1 className="text-2xl font-bold text-center mb-10 telephone:text-3xl">
          แบบฟอร์มสมัครเข้าสู่ระบบ
        </h1>

        <div className="mb-2">
          <label
            htmlFor="displayName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            ชื่อแสดงในเว็บไซต์ <span className=" text-red-700">*</span>
          </label>
          <input
            type="text"
            id="displayName"
            ref={displayNameEl}
            className="bg-slate-50  border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-gray-400 focus:border-gray-400 w-full p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            ชื่อผู้ใช้งาน <span className=" text-red-700">*</span>
          </label>
          <input
            type="text"
            id="username"
            ref={usernameEl}
            className="bg-slate-50  border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-gray-400 focus:border-gray-400 w-full p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            อีเมลล์ <span className=" text-red-700">*</span>
          </label>
          <input
            type="email"
            id="email"
            ref={emailEl}
            className="bg-slate-50  border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-gray-400 focus:border-gray-400 w-full p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            รหัสผ่าน <span className=" text-red-700">*</span>
          </label>
          <input
            type="password"
            id="password"
            ref={passwordEl}
            className="bg-slate-50  border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-gray-400 focus:border-gray-400 w-full p-2"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            ยืนยันรหัสผ่าน <span className=" text-red-700">*</span>
          </label>
          <input
            type="password"
            id="confirm_password"
            ref={confirm_passwordEl}
            className="bg-slate-50  border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-gray-400 focus:border-gray-400 w-full p-2"
            required
          />
        </div>

        <button
          className="text-white bg-redrose shadow-lg shadow-red-200  hover:bg-redrose focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md w-auto px-4 py-1.5 text-center"
          onClick={() => navigate("/")}
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="text-white bg-limegreen shadow-lg shadow-green-200  hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-auto px-4 py-1.5 text-center ml-2"
        >
          ยืนยัน
        </button>
      </form>
    </main>
  );
}
