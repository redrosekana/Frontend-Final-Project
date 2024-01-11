import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { isAxiosError } from "axios";
import { ToastContainer } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from "universal-cookie";

// firebase
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { FirebaseError } from "firebase/app";

// global components
import Reload from "../../../components/Reload";

// components
import GoogleButton from "./components/GoogleButton";
import LoginTextInput from "./components/LoginTextInput";

// global types
import { ErrorResponse } from "../../../types/ErrorResponseTypes";

// types
import { FormLoginTypes } from "./types/LoginTypes";

// hooks
import useAxios from "../../../hooks/useAxios";

// utils
import { toastSuccess, toastError } from "../../../utils/toastExtra";

function Login() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [reload, setReload] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginTypes>();

  const onSubmit: SubmitHandler<FormLoginTypes> = async (
    data: FormLoginTypes
  ) => {
    try {
      const body = {
        username: data.username.trim(),
        password: data.password.trim(),
      };

      setReload(true);
      cookies.remove("accessToken");
      cookies.remove("refreshToken");
      const result = await useAxios(
        "/auth/login-password",
        "post",
        body,
        false
      );

      setReload(false);
      cookies.set("accessToken", result.data.accessToken);
      cookies.set("refreshToken", result.data.refreshToken);
      toastSuccess("เข้าสู่ระบบสำเร็จ");

      setTimeout(() => {
        navigate("/page/home");
      }, 2000);
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
        toastError("เกิดข้อผิดพลาดในการทำรายการ");
      }
    }
  };

  const onLoginGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const googleResult = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(googleResult);

      const body = {
        firebase_token: await googleResult.user.getIdToken(),
        google_token: credential?.idToken,
      };

      setReload(true);
      cookies.remove("accessToken");
      cookies.remove("refreshToken");
      const result = await useAxios("/auth/login-google", "post", body, false);

      setReload(false);
      cookies.set("accessToken", result.data.accessToken);
      cookies.set("refreshToken", result.data.refreshToken);
      toastSuccess("เข้าสู่ระบบสำเร็จ");

      setTimeout(() => {
        navigate("/page/home");
      }, 2000);
    } catch (error) {
      const credential = GoogleAuthProvider.credentialFromError(
        error as FirebaseError
      );
      console.log(credential);
      toastError("เกิดข้อผิดพลาดในการทำรายการ");
    }
  };

  return (
    <React.Fragment>
      {reload ? <Reload /> : null}
      <main className="max-w-[1400px] w-full min-h-screen mx-auto flex justify-center items-center p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl w-full">
          <h1 className="font-bold text-center text-4xl sm:text-5xl md:text-6xl mb-10">
            Board Game Recommu
          </h1>

          <div className="mb-3">
            <LoginTextInput
              type="text"
              placeholder="ชื่อผู้ใช้งาน (username)"
              name="username"
              register={register}
              required
            />
            {errors.username?.type === "required" ? (
              <span className="text-red-700 ml-1">โปรดกรอกชื่อผู้ใช้งาน</span>
            ) : null}
          </div>

          <div>
            <LoginTextInput
              type="password"
              placeholder="รหัสผ่าน (password)"
              name="password"
              register={register}
              required
            />

            {errors.password?.type === "required" ? (
              <span className="text-red-700 ml-1">โปรดกรอกรหัสผ่าน</span>
            ) : null}
          </div>

          <div className="mb-6 text-end font-medium text-xl text-blue-800 underline mt-2">
            <NavLink to={"/email"}>ลืมรหัสผ่าน</NavLink>
          </div>

          <div className="flex flex-col tl:flex-row gap-2">
            <NavLink to={"/home"}>
              <button
                type="button"
                className="py-2 tl:py-1 tl:mt-0 bg-secondary hover:bg-red-700 text-white rounded-md text-md w-full h-full tl:w-32 transition ease-in duration-150"
              >
                กลับหน้าหลัก
              </button>
            </NavLink>

            <GoogleButton onLoginGoogle={onLoginGoogle} />

            <button
              type="submit"
              className="py-2 tl:py-1 tl:mt-0 bg-primary hover:bg-green-500 text-white rounded-md text-md w-full tl:w-28 transition ease-in duration-150"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </form>
        <ToastContainer />
      </main>
    </React.Fragment>
  );
}

export default Login;
