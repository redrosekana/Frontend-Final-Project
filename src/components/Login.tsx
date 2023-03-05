// import library
import React, { useRef, useState } from "react";
import { useNavigate, NavigateFunction, NavLink } from "react-router-dom";
import FacebookLogin from 'react-facebook-login'
import axios, { AxiosError } from "axios"
import Cookies from "universal-cookie"

// import component reload
import Reload from "./reload"

// import function api
import LoginApi from "../api/loginApi"

// import controller
import { createSwal } from "../controller/createSwal";

// declare interface and instance
interface LoginMember {
  username: string
  password: string
}
interface errorResponse {
  message: string;
}

// เรียก appid ของ facebook จากตัวแปร env (secret)
const facebookAppId:string = import.meta.env.VITE_URL_FACEBOOK_APP_ID as string
const urlFacebook = import.meta.env.VITE_URL_DEV + "/facebook"

function Login() {
	const cookie = new Cookies()
	const navigate:NavigateFunction = useNavigate()

	const usernameEl = useRef<HTMLInputElement>(null)
	const passwordEl = useRef<HTMLInputElement>(null)

	const [reload,SetReload] = useState<boolean>(false)

	// ฟังชันก์เมื่อกดปุ่ม เข้าสู่ระบบ
	const onSubmit = async (ev:React.FormEvent<HTMLFormElement>) => {
   	ev.preventDefault()
    
		// เช็คเงื่อนไขว่าต้องใส่ input ให้ครบ
		if (!usernameEl.current?.value.trim() || !passwordEl.current?.value.trim()) {
			createSwal("แจ้งเตือน", "โปรดกรอกข้อมูลให้ครบ", "warning", "#ec9e18")
			return
		}
			
		const body:LoginMember = {
			username: usernameEl.current!.value.trim(),
			password: passwordEl.current!.value.trim(),
		}

		SetReload(true)
		const result = await LoginApi(body)
		SetReload(false)
	
		if (result === "ต้องใส่ข้อมูลให้ครบ"
		|| result === "ไม่มีชื่อผู้ใช้งานนี้ในระบบ" 
		|| result === "รหัสผ่านไม่ถูกต้อง"){
			createSwal("แจ้งเตือน", result, "warning", "#ec9e18").then(() => {
				return
			})
		} else if (result === "มีข้อผิดพลาดของเซิฟเวอร์" 
		|| result === "มีข้อผิดพลาดของบราวเซอร์" ) {
			createSwal("เกิดข้อผิดพลาด", result, "error", "#e10000").then(() => {
				return
			})
		} else if (result === "เข้าสู่ระบบเสร็จสิ้น ระบบจะนำไปยังหน้าหลัก") {
			createSwal("สำเร็จ", result, "success", "#06b400").then(() => {
				navigate("/page/home")
			})
		}
		
  	}
  
	// ฟังชันก์เมื่อมีการกดปุ่ม facebook
	const responseFacebook = async (response:any) => {
		const { status, id, accessToken } = response
		
		if (status === "unknown"){
			createSwal("เกิดข้อผิดพลาด", "ไม่สามารถเข้าสู่ระบบได้ โปรดดำเนินการอีกครั้ง", "error", "#e10000").then(() => {
				return
			})
		}
		
		try{
			const result = await axios.post(urlFacebook,{
				userId:id,
				accessTokenFacebook:accessToken
			})

			// เมื่อเข้าได้ก็ทำการเก็บ token ใน cookie
			cookie.set("accessToken",result.data.accessToken, {path:"/"})
			cookie.set("refreshToken",result.data.refreshToken,{ path:"/"})
			navigate("/page/home")
		}catch(err: unknown |AxiosError ){
			if (axios.isAxiosError(err)){
				const message = (err.response?.data as errorResponse).message
				console.log(message)

				if (message === "need userId and accessTokenFacebook" 
				|| message === "occurred error in server"){
					createSwal("เกิดข้อผิดพลาด", "ไม่สามารถเข้าสู่ระบบได้ โปรดดำเนินการอีกครั้ง", "error", "#e10000").then(() => {
						window.location.href = "/login"
					})
				}
			}else {
				createSwal("เกิดข้อผิดพลาด", "มีข้อผิดพลาดของบราวเซอร์", "error", "#e10000").then(() => {
					window.location.href = "/login"
				})
			}
		}
	}

	return (
		<>
			{reload ? <Reload/> : null}
			<main className="container max-w-7xl w-full min-h-screen mx-auto flex justify-center items-center">
				<form className="max-w-2xl w-full p-5" onSubmit={(ev) => onSubmit(ev)}>
					<h1 className="font-bold text-center mb-10 text-3xl telephone:text-4xl sm:text-5xl lg:text-6xl">
						Board Game Recommu
					</h1>

					<div className="mb-4">
						<input
							type="text"
							className="bg-slate-50 border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-1 focus:ring-blue-700 focus:border-blue-700 focus:outline-none w-full p-4"
							placeholder="ชื่อผู้ใช้งาน (username)"
							ref={usernameEl}
						/>
					</div>

					<div className="">
						<input
							type="password"
							className="bg-slate-50  border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-1 focus:ring-blue-700 focus:border-blue-700 focus:outline-none w-full p-4"
							placeholder="รหัสผ่าน (password)"
							ref={passwordEl}
						/>
					</div>

					<div className="mb-6 text-end font-medium text-xl text-blue-800 underline mt-2">
						<NavLink to={"/email"}>ลืมรหัสผ่าน</NavLink>
					</div>
					
					
					<NavLink to={"/home"}>
						<button type="button" className="text-white bg-redrose hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md w-full telephone:w-32 px-5 py-2 text-center transition-colors duration-200 ease-in">
						กลับหน้าหลัก
						</button>
					</NavLink>
					
					<button type="submit"
						className="text-white bg-limegreen hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full telephone:w-28 px-5 py-2 text-center mt-3 telephone:ml-2 telephone:mt-0 transition-colors duration-200 ease-in"
					>
						เข้าสู่ระบบ
					</button>
					
					<div className="inline-block text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-md w-full telephone:w-28 px-5 py-2 text-center mt-3 telephone:ml-2 telephone:mt-0 transition-colors duration-200 ease-in">
						<FacebookLogin
							appId={`${facebookAppId}`}
							size="medium"
							fields="name,email,picture"
							callback={responseFacebook}
							cssClass="my-facebook-button-class"
							textButton="facebook"
						/>
					</div>
				</form>
			</main>
		</>
	)
}

export default Login
