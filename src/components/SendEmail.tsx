//* import library
import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate, NavigateFunction } from 'react-router-dom'

//* import api
import SendEmailApi from '../api/sendEmailApi'

//* import controller
import { ValidateEmail } from '../controller/formatEmail'
import { createSwal } from '../controller/createSwal'

//* import component reload
import Reload from './reload'

export default function SendEmail() {
  const [email,setEmail] = useState<string>("")
  const [reload,setReload] = useState<boolean>(false)

  const navigate:NavigateFunction = useNavigate()

  const onSubmit = async (email:string,ev:React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (!email) {
      createSwal("แจ้งเตือน","โปรดกรอกอีเมลล์ของคุณ","warning","#ec9e18").then(() => {
        return
      })
    }else if (!ValidateEmail(email)) {
      createSwal("แจ้งเตือน","รูปแบบของอีเมลล์ไม่ถูกต้อง","warning","#ec9e18").then(() => {
        return
      })
    }else {

      setReload(true)
      const result = await SendEmailApi(email)
      setReload(false)
      
      console.log(result)
      
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
          navigate("/page/home")
        })
      }
    }
  }
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      {reload ? <Reload/> : null}
      <div className='max-w-xl w-full p-4'>
        <div className='mb-14 text-center'>
          <h3 className='text-[28px] telephone:text-[35px] md:text-5xl font-bold'>Board Game RecCommu</h3>
        </div>
        <form className='flex flex-col' onSubmit={(ev) => onSubmit(email,ev)}>
          <label htmlFor="reset-password" className='text-base text-gray-900 font-medium'>
            กรอกอีเมลล์ของคุณ <span className='text-red-700'>*</span>
          </label>
          <input className='mt-3 rounded-md focus:ring-1 focus:outline-none' 
            value={email}
            type="email" 
            id="reset-password" onChange={(ev) => setEmail(ev.currentTarget.value)}
          />
          
          <div className='mt-6'>
            <button className="text-white bg-redrose shadow-lg shadow-red-200  hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg w-full telephone:w-auto px-4 py-1 telephone:py-1.5 text-center">
              <NavLink to="/">กลับหน้าหลัก</NavLink>
            </button>
            <button type="submit"
              className="text-white bg-limegreen shadow-lg shadow-green-200  hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-4 py-1 telephone:py-1.5 text-center w-full telephone:w-auto mt-4 telephone:mt-1 ml-0 telephone:ml-2">
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
