import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
import { FormSendEmailTypes } from "./types/EmailTypes";

// hooks
import useAxios from "../../../hooks/useAxios";

function Email() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSendEmailTypes>();

  const [reload, setReload] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormSendEmailTypes> = async (
    data: FormSendEmailTypes
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
    <React.Fragment>
      {reload ? <Reload /> : null}
      <main className="max-w-[1400px] w-full min-h-screen mx-auto flex justify-center items-center p-4">
        <div className="max-w-2xl w-full">
          <h3 className="font-bold text-center text-4xl sm:text-5xl md:text-6xl mb-8">
            Board Game RecCommu
          </h3>

          <form
            className="flex flex-col max-w-2xl w-full mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label
              htmlFor="reset-password"
              className="text-xl text-gray-900 font-medium mb-3"
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
              <span className=" text-red-700 mt-1">
                รูปแบบอีเมลล์ไม่ถูกต้อง
              </span>
            ) : null}

            <div className="mt-4 flex flex-col tl:flex-row gap-2">
              <NavLink to="/login">
                <button
                  type="reset"
                  className="py-2 tl:py-2 tl:px-4 bg-secondary hover:bg-red-700 text-white rounded-md text-md w-full h-full tl:w-28 transition ease-in duration-150"
                >
                  ย้อนกลับ
                </button>
              </NavLink>

              <button
                type="submit"
                className="py-2 tl:py-2 tl:px-4 bg-primary hover:bg-green-500 text-white rounded-md text-md w-full tl:w-28 transition ease-in duration-150"
              >
                ยืนยัน
              </button>
            </div>
          </form>
        </div>
      </main>
      <ToastContainer />
    </React.Fragment>
  );
}

export default Email;
