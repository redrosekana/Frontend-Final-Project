// import library
import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, Location, useNavigate , NavigateFunction } from 'react-router-dom'
import Cookies from 'universal-cookie'

// import controller
import { createSwal } from '../controller/createSwal'

// import component reload
import Reload from './reload'

// import api
import CheckValidToken from '../api/checkValidToken'
import UpdatePasswordApi from '../api/updatePasswordApi'

export default function ResetPassword() {
    const [password,setPassword] = useState<string>("")
    const [checkPassword,setCheckPassword] = useState<string>("")
    const [reload,setReload] = useState<boolean>(false)

    const location:Location = useLocation()
    const navigate:NavigateFunction = useNavigate()
    const cookie = new Cookies()

    useEffect(() => {
        const { search } = location
        const params:URLSearchParams = new URLSearchParams(search)
        const token:string | null = params.get("token")

        if (!token) {
            createSwal("แจ้งเตือน","ต้องดำเนินการภายในอีเมลล์ที่ส่งข้อมูลไปเท่านั้น","warning","#ec9e18").then(() => {
                navigate("/home")
            })
        }else {
            CheckValidToken(token).then(result => {
                if (result === "โทเคนหมดอายุแล้ว กรุณาทำการใหม่อีกครั้ง") {
                    createSwal("แจ้งเตือน","เกินเวลา 5 นาทีโปรดทำการใหม่อีกครั้ง","warning","#ec9e18").then(() => {
                        navigate("/email")
                    })
                }else if (result === "ต้องดำเนินการภายในอีเมลล์ที่ส่งข้อมูลไปเท่านั้น") {
                    createSwal("เกิดข้อผิดพลาด","ต้องดำเนินการภายในอีเมลล์ที่ส่งข้อมูลไปเท่านั้น","error","#e10000").then(() => {
                        navigate("/email")
                    })
                }else if (result === "มีข้อผิดพลาดของเซิฟเวอร์" || result === "มีข้อผิดพลาดของบราวเซอร์") {
                    createSwal("เกิดข้อผิดพลาด",result + "โปรดทำการใหม่อีกครั้ง","error","#e10000").then(() => {
                        navigate("/email")
                    })
                }
            })
        }
    },[])

    const onSubmit = async (password:string ,checkPassword:string, ev:React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        
        if (!password || !checkPassword) {
            createSwal("แจ้งเตือน","โปรดกรอกข้อมูลให้ครบถ้วน","warning","#ec9e18").then(() => {
                return
            })
        }else if (password !== checkPassword) {
            createSwal("แจ้งเตือน","รหัสผ่านไม่ตรงกัน","warning","#ec9e18").then(() => {
                return
            })
        }else {
            const { search } = location
            const params:URLSearchParams = new URLSearchParams(search)
            const token:string | null = params.get("token")

            if (!token) { 
                return
            }

            const body = {
                password:password,
                token:token
            }
            
            setReload(true)
            const result = await UpdatePasswordApi(body)
            setReload(false)

            if (result === "โทเคนหมดอายุแล้ว กรุณาทำการใหม่อีกครั้ง") {
                createSwal("แจ้งเตือน","เกินเวลา 5 นาทีโปรดทำการใหม่อีกครั้ง","warning","#ec9e18").then(() => {
                    navigate("/email")
                })
            }else if (result === "ข้อมูลไม่ถูกต้อง" || result === "มีข้อผิดพลาดของเซิฟเวอร์" || result === "มีข้อผิดพลาดของบราวเซอร์") {
                createSwal("เกิดข้อผิดพลาด",result,"error","#e10000").then(() => {
                    navigate("/email")
                })
            }else {
                createSwal("สำเร็จ","เปลี่ยนรหัสผ่านสำเร็จ","success","#06b400").then((value:any) => {
                    console.log(value)
                    if (value.isConfirmed) {
                        cookie.remove("accessToken",{path:"/"})
                        cookie.remove("refreshToken",{path:"/"})
                        navigate("/")
                    }
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
                <form className='flex flex-col' onSubmit={(ev) => onSubmit(password,checkPassword,ev)}>
                    <label htmlFor="new-password" className='mb-1 text-base font-medium text-gray-900'>
                        รหัสผ่านใหม่ <span className='text-red-700'>*</span>
                    </label>
                    <input className='className="bg-slate-50  border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-gray-400 focus:border-gray-400 w-full p-3"' 
                        value={password}
                        type="password"
                        id="new-password" onChange={(ev) => setPassword(ev.currentTarget.value)}
                    />
                    
                    <label htmlFor="check-password" className='mt-4 mb-1 text-base font-medium text-gray-900'>
                        ยืนยันรหัสผ่านใหม่ <span className='text-red-700'>*</span>
                    </label>
                    <input className='className="bg-slate-50  border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-gray-400 focus:border-gray-400 w-full p-3"' 
                        value={checkPassword}
                        type="password"
                        id="check-password" onChange={(ev) => setCheckPassword(ev.currentTarget.value)}
                    />
                    
                    <div className='mt-6'>
                        <button className="text-white bg-limegreen shadow-lg shadow-green-200  hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full telephone:w-auto px-4 py-1.5 text-center">
                            ยืนยัน
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
