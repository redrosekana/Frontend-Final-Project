import { useState } from "react";
import { NavLink, useNavigate, NavigateFunction } from "react-router-dom";
import { isAxiosError } from "axios";
import { ToastContainer } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";

// utils
import { toastSuccess, toastError } from "../../../utils/toastExtra";

// global components
import Reload from "../../../components/Reload";

// components
import SendEmailInput from "./components/SendEmailInput";

// global types
import { ErrorResponse } from "../../../types/ErrorResponseTypes";

// types
import { FormSendEmail } from "./types/EmailTypes";

// hooks
import useAxios from "../../../hooks/useAxios";

function Email() {
  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSendEmail>();

  const [reload, setReload] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormSendEmail> = async (
    data: FormSendEmail
  ) => {
    try {
      setReload(true);

      const body = { email: data.email.trim() };
      await useAxios("/email", "post", body, false);

      setReload(false);
      toastSuccess(
        "ลิงค์เปลี่ยนรหัสผ่านส่งไปที่อีเมลเรียบร้อย โปรดตรวจสอบอีเมล"
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setReload(false);

      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;
        console.log(data);
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
        toastError("เกิดข้อผิดพลาดในการทำรายการ");
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            htmlFor="reset-password"
            className="text-xl text-gray-900 font-medium"
          >
            กรอกอีเมลล์ของคุณ <span className="text-red-700">*</span>
          </label>
          <SendEmailInput
            type="text"
            placeholder="อีเมล (email)"
            name="email"
            register={register}
            required
            pattern={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}
          />

          {errors.email?.type === "required" ? (
            <span className=" text-red-700 mt-1">โปรดกรอกอีเมลล์</span>
          ) : null}

          {errors.email?.type === "pattern" ? (
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
