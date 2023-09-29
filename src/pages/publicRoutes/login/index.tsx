// import library
import React, { useState } from "react";
import { useNavigate, NavigateFunction, NavLink } from "react-router-dom";
import { isAxiosError } from "axios";
import Cookies from "universal-cookie";
import { ToastContainer } from "react-toastify";

// components
import Reload from "../../../components/reload";

// utils
import { axiosExtra } from "../../../utils/axiosExtra";
import { toastSuccess, toastError } from "../../../utils/toastExtra";

// interface
import { ErrorResponse } from "../../../interfaces/axios.interface";

function Login() {
  const cookie = new Cookies();
  const navigate: NavigateFunction = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsSubmit(true);
    if (!username.trim() || !password.trim()) return;

    try {
      const body = { username: username.trim(), password: password.trim() };
      setReload(true);
      const result = await axiosExtra(
        "/auth/login-password",
        "post",
        body,
        false
      );
      setReload(false);
      toastSuccess(result.data.message);

      cookie.set("accessToken", result.data.accessToken);
      cookie.set("refreshToken", result.data.refreshToken);

      setTimeout(() => {
        navigate("/page/home");
      }, 2500);
    } catch (error) {
      setReload(false);
      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;

        if (Array.isArray(data.message)) {
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        } else if (data.message === "there is no username in the system") {
          toastError("ไม่มีผู้ใช้งานนี้ในระบบ");
        } else if (data.message === "invalid password") {
          toastError("รหัสผ่านไม่ถูกต้อง");
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
      <main className="container max-w-7xl w-full min-h-screen mx-auto flex justify-center items-center">
        <form className="max-w-2xl w-full p-5" onSubmit={(ev) => onSubmit(ev)}>
          <h1 className="font-bold text-center mb-10 text-3xl telephone:text-4xl sm:text-5xl lg:text-6xl">
            Board Game Recommu
          </h1>
          <div className="mb-4">
            <input
              type="text"
              className="mb-1 bg-slate-50 border border-gray-300 text-gray-700 text-base rounded-lg w-full p-4"
              placeholder="ชื่อผู้ใช้งาน (username)"
              value={username}
              onInput={(ev) => setUsername(ev.currentTarget.value)}
            />
            {isSubmit && !username ? (
              <span className="text-red-700 ml-1">โปรดกรอกชื่อผู้ใช้งาน</span>
            ) : null}
          </div>

          <div className="">
            <input
              type="password"
              className="mb-1 bg-slate-50  border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-1 focus:ring-blue-700 focus:border-blue-700 focus:outline-none w-full p-4"
              placeholder="รหัสผ่าน (password)"
              value={password}
              onInput={(ev) => setPassword(ev.currentTarget.value)}
            />
            {isSubmit && !password ? (
              <span className="text-red-700 ml-1">โปรดกรอกรหัสผ่าน</span>
            ) : null}
          </div>

          <div className="mb-6 text-end font-medium text-xl text-blue-800 underline mt-2">
            <NavLink to={"/email"}>ลืมรหัสผ่าน</NavLink>
          </div>

          <NavLink to={"/home"}>
            <button
              type="button"
              className="text-white bg-redrose hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md w-full telephone:w-32 px-5 py-2 text-center transition-colors duration-200 ease-in"
            >
              กลับหน้าหลัก
            </button>
          </NavLink>

          <button
            type="submit"
            className="text-white bg-limegreen hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full telephone:w-28 px-5 py-2 text-center mt-3 telephone:ml-2 telephone:mt-0 transition-colors duration-200 ease-in"
          >
            เข้าสู่ระบบ
          </button>
        </form>
        <ToastContainer />
      </main>
    </>
  );
}

export default Login;
