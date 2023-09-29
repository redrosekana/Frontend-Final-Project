// import library
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { isAxiosError } from "axios";
import {
  useLocation,
  Location,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";

// utils
import { toastSuccess, toastError } from "../../../utils/toastExtra";
import { ErrorResponse } from "../../../interfaces/axios.interface";

// components
import Reload from "../../../components/reload";
import { axiosExtra } from "../../../utils/axiosExtra";

export default function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [reload, setReload] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] =
    useState<boolean>(false);

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (password === confirmPassword) setInvalidConfirmPassword(false);
  }, [password, confirmPassword]);

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsSubmit(true);

    const { search } = location;
    const params: URLSearchParams = new URLSearchParams(search);
    const token: string | null = params.get("token");
    console.log(token);

    if (!password.trim() || !confirmPassword.trim()) {
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setInvalidConfirmPassword(true);
      return;
    }

    try {
      const body = { token, password_new: password.trim() };
      setReload(true);
      await axiosExtra("/email-verify", "post", body, false);
      setReload(false);

      toastSuccess("เปลี่ยนรหัสผ่านสำเร็จแล้ว");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      setReload(false);
      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;
        console.log(data);
        toastError("เกิดข้อผิดพลาดในการทำรายการ โปรดทำรายการอีกครั้ง");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {reload ? <Reload /> : null}
      <div className="max-w-2xl w-full p-4">
        <div className="mb-14 text-center">
          <h3 className="text-[28px] telephone:text-[35px] md:text-6xl font-bold">
            Board Game RecCommu
          </h3>
        </div>
        <form className="flex flex-col" onSubmit={(ev) => onSubmit(ev)}>
          <label
            htmlFor="new-password"
            className="mb-1 text-base font-medium text-gray-900"
          >
            รหัสผ่านใหม่ <span className="text-red-700">*</span>
          </label>
          <input
            className='className="bg-slate-50  border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-gray-400 focus:border-gray-400 w-full p-3"'
            value={password}
            type="password"
            id="new-password"
            onInput={(ev) => setPassword(ev.currentTarget.value)}
          />
          {isSubmit && !password ? (
            <span className="mt-1 text-red-700">โปรดกรอกรหัสผ่านใหม่</span>
          ) : null}

          <label
            htmlFor="check-password"
            className="mt-6 mb-1 text-base font-medium text-gray-900"
          >
            ยืนยันรหัสผ่านใหม่ <span className="text-red-700">*</span>
          </label>
          <input
            className='className="bg-slate-50  border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-gray-400 focus:border-gray-400 w-full p-3"'
            value={confirmPassword}
            type="password"
            id="check-password"
            onInput={(ev) => setConfirmPassword(ev.currentTarget.value)}
          />
          {isSubmit && !confirmPassword ? (
            <span className="mt-1 text-red-700">โปรดยืนยันรหัสผ่าน</span>
          ) : null}
          {isSubmit && invalidConfirmPassword ? (
            <span className="mt-1 text-red-700">รหัสผ่านไม่ตรงกัน</span>
          ) : null}

          <div className="mt-6">
            <button className="text-white bg-limegreen shadow-md shadow-green-200  hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full telephone:w-auto px-4 py-1.5 text-center">
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
