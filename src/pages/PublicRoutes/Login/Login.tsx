import { useState } from "react";
import { useNavigate, NavigateFunction, NavLink } from "react-router-dom";
import { isAxiosError } from "axios";
import { ToastContainer } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";

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
import { FormLogin } from "./types/LoginTypes";

// hooks
import useAxios from "../../../hooks/useAxios";
import useCookie from "../../../hooks/useCookie";

// utils
import { toastSuccess, toastError } from "../../../utils/toastExtra";

function Login() {
  const navigate: NavigateFunction = useNavigate();

  const [accessToken, setAccessToken] = useCookie("accessToken", null);
  const [refreshToken, setRefreshToken] = useCookie("refreshToken", null);
  const [reload, setReload] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>();

  const onSubmit: SubmitHandler<FormLogin> = async (data: FormLogin) => {
    try {
      const body = {
        username: data.username.trim(),
        password: data.password.trim(),
      };

      setReload(true);
      const result = await useAxios(
        "/auth/login-password",
        "post",
        body,
        false
      );

      setReload(false);
      setAccessToken(result.data.accessToken);
      setRefreshToken(result.data.refreshToken);
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
      const result = await useAxios("/auth/login-google", "post", body, false);

      setReload(false);
      setAccessToken(result.data.accessToken);
      setRefreshToken(result.data.refreshToken);
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
    <>
      {reload ? <Reload /> : null}
      <main className="container max-w-7xl w-full min-h-screen mx-auto flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl w-full p-5"
        >
          <h1 className="font-bold text-center mb-10 text-3xl telephone:text-4xl sm:text-5xl lg:text-6xl">
            Board Game Recommu
          </h1>
          <div className="mb-4">
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

          <div className="flex flex-col telephone:flex-row gap-x-2">
            <NavLink to={"/home"}>
              <button
                type="button"
                className="text-white bg-redrose hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md w-full telephone:w-32 h-10 px-5 py-2 text-center transition-colors duration-200 ease-in"
              >
                กลับหน้าหลัก
              </button>
            </NavLink>

            <GoogleButton onLoginGoogle={onLoginGoogle} />

            <button
              type="submit"
              className="text-white bg-limegreen hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full telephone:w-32 mt-2 telephone:mt-0 h-10 px-5 py-2 text-center transition-colors duration-200 ease-in"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </form>
        <ToastContainer />
      </main>
    </>
  );
}

export default Login;
