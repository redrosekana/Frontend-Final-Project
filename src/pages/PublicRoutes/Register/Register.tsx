import { useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { isAxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

// global types
import { ErrorResponse } from "../../../types/ErrorResponseTypes";

// types
import { FormRegister } from "./types/RegisterTypes";

// global components
import Reload from "../../../components/Reload";

// components
import RegisterInput from "./components/RegisterInput";

// utils
import { toastError, toastSuccess } from "../../../utils/toastExtra";

// hooks
import useAxios from "../../../hooks/useAxios";

function Register() {
  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormRegister>();

  const [reload, setReload] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormRegister> = async (data: FormRegister) => {
    try {
      const body = {
        displayName: data.displayName.trim(),
        username: data.username.trim(),
        email: data.email.trim(),
        password: data.password.trim(),
      };

      setReload(true);
      await useAxios("/auth/register", "post", body, false);

      setReload(false);
      toastSuccess("ลงทะเบียนสำเร็จ");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setReload(false);

      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;
        if (Array.isArray(data.message)) {
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        } else if (data.message === "displayName is repeated") {
          toastError("ชื่อแสดงในเว็บไซต์ถูกใช้งานแล้ว");
        } else if (data.message === "username is repeated") {
          toastError("ชื่อผู้ใช้งานถูกใช้งานแล้ว");
        } else if (data.message === "email is repeated") {
          toastError("อีเมลล์ถูกใช้งานแล้ว");
        } else {
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        }
      } else {
        toastError("เกิดข้อผิดพลาดในการทำรายการ");
      }
    }
  };

  return (
    <>
      {reload ? <Reload /> : null}
      <main className="container max-w-7xl mx-auto">
        <form
          className="max-w-xl mx-auto mt-5 py-8 p-5 sm:px-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-[1.6rem] font-bold text-center mb-10 telephone:text-[2rem] sm:text-[2.8rem]">
            แบบฟอร์มสมัครเข้าสู่ระบบ
          </h1>

          <RegisterInput
            label="ชื่อแสดงในเว็บไซต์"
            type="text"
            name="displayName"
            register={register}
            required
            pattern={/.*/gi}
          />
          {errors.displayName?.type === "required" ? (
            <span className=" block mb-2 text-red-700">
              โปรดกรอกชื่อแสดงในเว็บไซต์
            </span>
          ) : null}

          <RegisterInput
            label="ชื่อผู้ใช้งาน"
            type="text"
            name="username"
            register={register}
            required
            pattern={/.*/gi}
          />
          {errors.username?.type === "required" ? (
            <span className=" block mb-2 text-red-700">
              โปรดกรอกชื่อผู้ใช้งาน
            </span>
          ) : null}

          <RegisterInput
            label="อีเมล"
            type="text"
            name="email"
            register={register}
            required
            pattern={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi}
          />

          {errors.email?.type === "required" ? (
            <span className=" block mb-2 text-red-700">โปรดกรอกอีเมลล์</span>
          ) : null}
          {errors.email?.type === "pattern" ? (
            <span className=" block mb-2 text-red-700">
              รูปแบบของอีเมลล์ไม่ถูกต้อง
            </span>
          ) : null}

          <RegisterInput
            label="รหัสผ่าน"
            type="password"
            name="password"
            register={register}
            required
            pattern={/.*/gi}
          />
          {errors.password?.type === "required" ? (
            <span className=" block mb-2 text-red-700">โปรดกรอกรหัสผ่าน</span>
          ) : null}

          <RegisterInput
            label="ยืนยันรหัสผ่าน"
            type="password"
            name="confirmPassword"
            register={register}
            required
            pattern={/.*/gi}
            validate={(value) => getValues("password") === value}
          />
          {errors.confirmPassword?.type === "required" ? (
            <span className=" block mb-2 text-red-700">โปรดยืนยันรหัสผ่าน</span>
          ) : null}
          {errors.confirmPassword?.type === "validate" ? (
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
