// import library
import React, { useEffect, useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { isAxiosError } from "axios";

// interface
import { ErrorResponse } from "../../../interfaces/axios.interface";

// import component reload
import Reload from "../../../components/reload";
import Input from "./Input";

// utils
import { axiosExtra } from "../../../utils/axiosExtra";
import { ValidateEmail } from "../../../utils/formatEmail";
import { toastError, toastSuccess } from "../../../utils/toastExtra";

function Register() {
  const navigate: NavigateFunction = useNavigate();

  const [displayName, setDisplayName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConformPassword] = useState<string>("");

  // check validate
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] =
    useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    if (ValidateEmail(email)) setInvalidEmail(false);
    if (password === confirmPassword) setInvalidConfirmPassword(false);
  }, [email, password, confirmPassword]);

  // ฟังชันก์เมื่อกดปุ่มยืนยัน
  const submitBtn = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsSubmit(true);

    if (
      !displayName.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      return;
    }

    if (!ValidateEmail(email.trim())) {
      setInvalidEmail(true);
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setInvalidConfirmPassword(true);
      return;
    }

    try {
      const body = {
        displayName: displayName.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      };

      setReload(true);
      const result = await axiosExtra("/auth/register", "post", body, false);
      setReload(false);

      toastSuccess(result.data.message);
      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      setReload(false);
      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;

        if (Array.isArray(data.message)) {
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        } else if (data.message === "username is repeated") {
          toastError("ชื่อผู้ใช้งานถูกใช้งานแล้ว");
        } else if (data.message === "email is repeated") {
          toastError("อีเมลล์ถูกใช้งานแล้ว");
        } else {
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        }
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      {reload ? <Reload /> : null}
      <main className="container max-w-7xl mx-auto">
        <form
          className="max-w-xl mx-auto mt-5 py-8 p-5 sm:px-0"
          onSubmit={(ev) => submitBtn(ev)}
        >
          <h1 className="text-[1.6rem] font-bold text-center mb-10 telephone:text-[2rem] sm:text-[2.8rem]">
            แบบฟอร์มสมัครเข้าสู่ระบบ
          </h1>

          <Input
            label="ชื่อแสดงในเว็บไซต์"
            type="text"
            id="displayName"
            value={displayName}
            onInput={setDisplayName}
          />
          {isSubmit && !displayName ? (
            <span className=" block mb-2 text-red-700">
              โปรดกรอกชื่อแสดงในเว็บไซต์
            </span>
          ) : null}

          <Input
            label="ชื่อผู้ใช้งาน"
            type="text"
            id="username"
            value={username}
            onInput={setUsername}
          />
          {isSubmit && !username ? (
            <span className=" block mb-2 text-red-700">
              โปรดกรอกชื่อผู้ใช้งาน
            </span>
          ) : null}

          <Input
            label="อีเมลล์"
            type="text"
            id="email"
            value={email}
            onInput={setEmail}
          />
          {isSubmit && !email ? (
            <span className=" block mb-2 text-red-700">โปรดกรอกอีเมลล์</span>
          ) : null}
          {isSubmit && invalidEmail ? (
            <span className=" block mb-2 text-red-700">
              รูปแบบของอีเมลล์ไม่ถูกต้อง
            </span>
          ) : null}

          <Input
            label="รหัสผ่าน"
            type="password"
            id="password"
            value={password}
            onInput={setPassword}
          />
          {isSubmit && !password ? (
            <span className=" block mb-2 text-red-700">โปรดกรอกรหัสผ่าน</span>
          ) : null}

          <Input
            label="ยืนยันรหัสผ่าน"
            type="password"
            id="confirm_password"
            value={confirmPassword}
            onInput={setConformPassword}
          />
          {isSubmit && !confirmPassword ? (
            <span className=" block mb-2 text-red-700">โปรดยืนยันรหัสผ่าน</span>
          ) : null}
          {isSubmit && invalidConfirmPassword ? (
            <span className=" block mb-2 text-red-700">
              โปรดใส่รหัสผ่านให้ตรงกัน
            </span>
          ) : null}

          <button
            type="button"
            onClick={() => navigate("/home")}
            className="mt-2 text-white bg-redrose hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md w-auto px-4 py-2 text-center transition-colors duration-200 ease-in"
          >
            กลับหน้าหลัก
          </button>
          <button
            type="submit"
            className="text-white bg-limegreen hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-auto px-4 py-2 text-center ml-2 transition-colors duration-200 ease-in"
          >
            ยืนยัน
          </button>
        </form>
      </main>
      <ToastContainer />
    </>
  );
}

export default Register;
