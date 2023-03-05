// import library
import React from 'react'
import { useState,useRef } from 'react'
import { NavLink, useNavigate, NavigateFunction } from 'react-router-dom'

// import api
import EmailApi from '../api/EmailApi'

// import controller
import { ValidateEmail } from '../controller/formatEmail'
import { createSwal } from '../controller/createSwal'

// import component reload
import Reload from './reload'

function Email() {
   const emailEl = useRef<HTMLInputElement>(null)
   const [reload,setReload] = useState<boolean>(false)

   const navigate:NavigateFunction = useNavigate()

   const onSubmit = async (ev:React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault()

      const checkEmail:string = emailEl.current!.value
      
      if (!checkEmail) {
         createSwal("แจ้งเตือน","โปรดกรอกอีเมลล์ของคุณ","warning","#ec9e18").then(() => {
            return
         })
      }else if (!ValidateEmail(checkEmail)) {
         createSwal("แจ้งเตือน","รูปแบบของอีเมลล์ไม่ถูกต้อง","warning","#ec9e18").then(() => {
            return
         })
      }else {

         setReload(true)
         const result = await EmailApi(checkEmail)
         setReload(false)
         
         if (result === "ไม่มีอีเมลล์ของผู้ใช้งานนี้") {
            createSwal("แจ้งเตือน",result,"warning","#ec9e18").then(() => {
               return
            })
         }else if (result === "มีข้อผิดพลาดของเซิฟเวอร์" || result === "มีข้อผิดพลาดของบราวเซอร์") {
            createSwal("เกิดข้อผิดพลาด",result,"error","#e10000").then(() => {
               return
            })
         }else if (result === "โปรดกรอกอีเมลล์ของคุณ") {
            createSwal("แจ้งเตือน",result,"warning","#ec9e18").then(() => {
               return
            })
         }else if (result === "กรุณาระบุรูปแบบของอีเมลล์ให้ถูกต้อง") {
            createSwal("แจ้งเตือน",result,"warning","#ec9e18").then(() => {
               return
            })
         }
         else {
            createSwal("สำเร็จ",result as string,"success","#06b400").then(() => {
               navigate("/home")
            })
         }
      }
   }
  return (
    <div className='min-h-screen max-w-7xl mx-auto w-full flex items-center justify-center'>
      {reload ? <Reload/> : null}
      <div className='max-w-3xl w-full p-4'>
        <div className='mb-10 text-center'>
          <h3 className='text-3xl telephone:text-4xl sm:text-5xl lg:text-6xl font-bold'>Board Game RecCommu</h3>
        </div>

        <form className='flex flex-col max-w-2xl w-full mx-auto' onSubmit={(ev) => onSubmit(ev)}>
          <label htmlFor="reset-password" className='text-xl text-gray-900 font-medium'>
            กรอกอีเมลล์ของคุณ <span className='text-red-700'>*</span>
          </label>
          <input className='mt-3 bg-slate-50 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-blue-700 focus:border-blue-700 p-3' 
            type="email" 
            ref={emailEl}
            id="reset-password"
         />
          
          <div className='mt-4'>
            <NavLink to="/login">
               <button type="reset" className="text-white bg-redrose hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md w-full telephone:w-24 px-4 py-2 text-center">ย้อนกลับ</button>
            </NavLink>
            
            <button type="submit" className="text-white bg-limegreen hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md px-4 py-2 text-center w-full telephone:w-24 mt-3 telephone:mt-1 ml-0 telephone:ml-2">
               ยืนยัน
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Email
