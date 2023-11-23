import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { isAxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useLocation,
  Location,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";

// utils
import { toastSuccess, toastError } from "../../../utils/toastExtra";

// global types
import { ErrorResponse } from "../../../types/ErrorResponseTypes";

// types
import { FormResetPassword } from "./types/ResetPasswordTypes";

// global components
import Reload from "../../../components/Reload";

// components
import ResetPasswordInput from "./components/ResetPasswordInput";

// hooks
import useAxios from "../../../hooks/useAxios";

export default function ResetPassword() {
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormResetPassword>();

  const [reload, setReload] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormResetPassword> = async (
    data: FormResetPassword
  ) => {
    const { search } = location;
    const params: URLSearchParams = new URLSearchParams(search);
    const token: string | null = params.get("token");

    try {
      const body = { token, password_new: data.password.trim() };

      setReload(true);
      await useAxios("/email-verify", "post", body, false);

      setReload(false);
      toastSuccess("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setReload(false);
      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;
        toastError("เกิดข้อผิดพลาดในการทำรายการ โปรดทำรายการอีกครั้ง");
      } else {
        toastError("เกิดข้อผิดพลาดในการทำรายการ โปรดทำรายการอีกครั้ง");
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
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="new-password"
            className="mb-1 text-base font-medium text-gray-900"
          >
            รหัสผ่านใหม่ <span className="text-red-700">*</span>
          </label>
          <ResetPasswordInput
            type="password"
            name="password"
            register={register}
            required
          />
          {errors.password?.type === "required" ? (
            <span className="mt-1 text-red-700">โปรดกรอกรหัสผ่านใหม่</span>
          ) : null}

          <label
            htmlFor="check-password"
            className="mt-6 mb-1 text-base font-medium text-gray-900"
          >
            ยืนยันรหัสผ่านใหม่ <span className="text-red-700">*</span>
          </label>
          <ResetPasswordInput
            type="password"
            name="confirmPassword"
            register={register}
            required
            validate={(value) => value === getValues("password")}
          />
          {errors.confirmPassword?.type === "required" ? (
            <span className="mt-1 text-red-700">โปรดยืนยันรหัสผ่าน</span>
          ) : null}
          {errors.confirmPassword?.type === "validate" ? (
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
