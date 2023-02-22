// import library
import React, { useRef, useState } from "react"
import { useNavigate, NavigateFunction } from "react-router-dom"

// import fucntion api
import RegisterApi from "../api/registerApi"

// import component reload
import Reload from "./reload"

// import controller
import { createSwal } from "../controller/createSwal"

// declare interface
interface RegisterMember {
  displayName: string;
  username: string;
  password: string;
  email: string;
}

function Register() {
   const navigate: NavigateFunction = useNavigate();

   const displayNameEl = useRef<HTMLInputElement>(null);
   const usernameEl = useRef<HTMLInputElement>(null);
   const emailEl = useRef<HTMLInputElement>(null);
   const passwordEl = useRef<HTMLInputElement>(null);
   const confirm_passwordEl = useRef<HTMLInputElement>(null);

   // ไว้เก็บค่าสถานะตอน reload
   const [reload,setReload] = useState<boolean>(false)

   // ฟังชันก์เมื่อกดปุ่มยืนยัน
   const submitBtn = async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      
      // เช็คว่าต้องใส่ค่าให้ครบทุก input
      if ((!displayNameEl.current?.value)
      || !(usernameEl.current?.value) 
      || !(emailEl.current?.value) 
      || !(passwordEl.current!.value)
      || !(confirm_passwordEl.current?.value)){
         createSwal("แจ้งเตือน", "โปรดกรอกข้อมูลให้ครบ", "warning", "#ec9e18")
         return 
      }

      // เช็คว่ารหัสผ่าน กับ คอนเฟิมรหัสผ่านต้องตรงกัน
      if (passwordEl.current?.value !== confirm_passwordEl.current?.value) {
         createSwal("แจ้งเตือน", "โปรดใส่รหัสผ่านให้ตรงกัน", "warning", "#ec9e18")
         return
      }

      const body: RegisterMember = {
         displayName: displayNameEl.current!.value.trim(),
         username: usernameEl.current!.value.trim(),
         email: emailEl.current!.value.trim(),
         password: passwordEl.current!.value.trim(),
      }

      setReload(true)
      const result = await RegisterApi(body)
      setReload(false)
      
      if (result === "ชื่อแสดงในเว็บไซต์ ถูกใช้งานแล้ว" 
      || result === "ชื่อผู้ใช้งาน ถูกใช้งานแล้ว" 
      || result === "อีเมลล์ ถูกใช้งานแล้ว" 
      || result === "ใส่ข้อมูลไม่ครบ") {
         createSwal("แจ้งเตือน", result, "warning", "#ec9e18").then(() => {
            return
         })
      } else if (result === "มีข้อผิดพลาดของเซิฟเวอร์" 
      || result === "มีข้อผิดพลาดของบราวเซอร์") {
         createSwal("เกิดข้อผิดพลาด", result, "error", "#e10000").then(() => {
            return
         })
      } else if (result === "สมัครเสร็จสิ้น ระบบจะนำไปยังหน้าเข้าสู่ระบบ") {
         createSwal("สำเร็จ", result, "success", "#06b400").then(() => {
            navigate("/login")
         })
      }
   }

   return (
      <>
         {reload ? <Reload/> : null}
         <main className="container max-w-7xl mx-auto">
            <form className="max-w-xl mx-auto mt-5 py-8 p-5 sm:px-0" onSubmit={(ev) => submitBtn(ev)}>
               <h1 className="text-[1.6rem] font-bold text-center mb-10 telephone:text-[2rem] sm:text-[2.8rem]">
               แบบฟอร์มสมัครเข้าสู่ระบบ
               </h1>

               <InputTag nameLabel="ชื่อแสดงในเว็บไซต์" type="text"  id="displayName" refEl={displayNameEl}/>
               <InputTag nameLabel="ชื่อผู้ใช้งาน" type="text"  id="username" refEl={usernameEl}/>
               <InputTag nameLabel="อีเมลล์" type="email"  id="email" refEl={emailEl}/>
               <InputTag nameLabel="รหัสผ่าน" type="password"  id="password" refEl={passwordEl}/>
               <InputTag nameLabel="ยืนยันรหัสผ่าน" type="password"  id="confirm_password" refEl={confirm_passwordEl}/>

               <button type="button" onClick={() => navigate("/home")}
                  className="text-white bg-redrose hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md w-auto px-4 py-2 text-center transition-colors duration-200 ease-in"
               >
                  กลับหน้าหลัก
               </button>
               <button type="submit"
                  className="text-white bg-limegreen hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-auto px-4 py-2 text-center ml-2 transition-colors duration-200 ease-in"
               >
                  ยืนยัน
               </button>
            </form>
         </main>
      </>
   )
}


// declare interface for components inputTag
interface inputTagProps {
   nameLabel:string
   type:string
   id:string
   refEl:React.RefObject<HTMLInputElement>
}

const InputTag = ({nameLabel , type , id , refEl }:inputTagProps) => {
   return (
      <div className="mb-3">
         <label htmlFor={id} className="block mb-2 text-base font-medium text-gray-900">
            {nameLabel} <span className=" text-red-700">*</span>
         </label>
         <input type={type} id={id} ref={refEl} className="bg-slate-50  border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-blue-700 focus:border-blue-700 w-full p-3"/>
      </div>
   )
}

export default Register
