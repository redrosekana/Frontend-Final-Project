// import library
import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, NavigateFunction } from "react-router-dom";
import { isAxiosError } from "axios";
import { ToastContainer } from "react-toastify";

// utils
import { axiosExtra } from "../../../utils/axiosExtra";
import { ValidateEmail } from "../../../utils/formatEmail";
import { toastSuccess, toastError } from "../../../utils/toastExtra";

// interface
import { ErrorResponse } from "../../../interfaces/axios.interface";

// components
import Reload from "../../../components/Reload";

function Email() {
  const [email, setEmail] = useState<string>("");
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (ValidateEmail(email)) setInvalidEmail(false);
  }, [email]);

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsSubmit(true);

    if (!email.trim()) {
      return;
    }

    if (!ValidateEmail(email.trim())) {
      setInvalidEmail(true);
      return;
    }

    try {
      setReload(true);
      const result = await axiosExtra("/email", "post", { email }, false);
      setReload(false);
      console.log(result);
      toastSuccess(
        "ลิงค์เปลี่ยนรหัสผ่านส่งไปที่อีเมลล์เรียบร้อย โปรดตรวจสอบอีเมลล์ของท่าน"
      );
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      setReload(false);
      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;

        if (Array.isArray(data.message)) {
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        } else if (data.message === "invalid format email") {
          toastError("รูปแบบอีเมลล์ไม่ถูกต้อง");
        } else if (data.message === "there is no email in the system") {
          toastError("ไม่มีอีเมลล์นี้ในระบบ");
        } else {
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        }
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div className="min-h-screen max-w-7xl mx-auto w-full flex items-center justify-center">
      {reload ? <Reload /> : null}
      <div className="max-w-3xl w-full p-4">
        <div className="mb-10 text-center">
          <h3 className="text-3xl telephone:text-4xl sm:text-5xl lg:text-6xl font-bold">
            Board Game RecCommu
          </h3>
        </div>

        <form
          className="flex flex-col max-w-2xl w-full mx-auto"
          onSubmit={(ev) => onSubmit(ev)}
        >
          <label
            htmlFor="reset-password"
            className="text-xl text-gray-900 font-medium"
          >
            กรอกอีเมลล์ของคุณ <span className="text-red-700">*</span>
          </label>
          <input
            className="mt-3 bg-slate-50 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-blue-700 focus:border-blue-700 p-3"
            type="text"
            value={email}
            onInput={(ev) => setEmail(ev.currentTarget.value)}
            id="reset-password"
          />
          {isSubmit && !email ? (
            <span className=" text-red-700 mt-1">โปรดกรอกอีเมลล์</span>
          ) : null}

          {isSubmit && invalidEmail ? (
            <span className=" text-red-700 mt-1">รูปแบบอีเมลล์ไม่ถูกต้อง</span>
          ) : null}

          <div className="mt-4">
            <NavLink to="/login">
              <button
                type="reset"
                className="text-white bg-redrose hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md w-full telephone:w-24 px-4 py-2 text-center"
              >
                ย้อนกลับ
              </button>
            </NavLink>

            <button
              type="submit"
              className="text-white bg-limegreen hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md px-4 py-2 text-center w-full telephone:w-24 mt-3 telephone:mt-1 ml-0 telephone:ml-2"
            >
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Email;
