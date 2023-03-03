// import library
import React , { useEffect,useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import avatar from "../assets/avatar.svg"
import Cookies from "universal-cookie"
import { useNavigate , NavigateFunction } from "react-router-dom"

// import api
import GetMemberApi from "../api/getMemberApi"

// import controller
import { createSwal } from "../controller/createSwal"

// declare inteface for display information user
interface InformationDisplay {
   message: string;
   displayName:string;
   username?:string;
   email?:string
   facebookId?:string;
   facebookName?:string
}

type Status = "facebook" | "member" | null

function Profile() {
   const cookie = new Cookies();
   const navigate:NavigateFunction = useNavigate();

   const [status,setStatus] = useState<Status>(null)

   const accessToken:string = cookie.get("accessToken")
   const refreshToken:string = cookie.get("refreshToken")

   const usernameEl = useRef<HTMLInputElement>(null)
   const displayNameMemberEl = useRef<HTMLInputElement>(null)
   const displayNameFacebookEl = useRef<HTMLInputElement>(null)
   const emailEl = useRef<HTMLInputElement>(null)
   const facebookIdEl = useRef<HTMLInputElement>(null)
   const facebookNameEl = useRef<HTMLInputElement>(null)
   
   useEffect(() => {
      GetMemberApi(accessToken,"/user").then((res) => {
         if (res === "รูปแบบการส่งไม่ถูกต้อง" || res === "accessToken ไม่มีสิทธิเข้าถึง"){
            createSwal("เกิดข้อผิดพลาด", "โปรดทำการเข้าสู่ระบบก่อน", "error", "#e10000").then(() => {
               navigate("/home")
            })
         }else if (res === "มีข้อผิดพลาดของเซิฟเวอร์" || res === "มีข้อผิดพลาดของบราวเซอร์"){
            createSwal("เกิดข้อผิดพลาด", `${res} ทำการเข้าสู่ระบบอีกครั้ง`, "error", "#e10000").then(() => {
               navigate("/login")
            })
         }else if (res === "accessToken หมดอายุ"){
            GetMemberApi(refreshToken,"/renew").then((res:any) => {
               if (res === "รูปแบบการส่งไม่ถูกต้อง" || res === "refreshToken ไม่มีสิทธิเข้าถึง"){
                  createSwal("เกิดข้อผิดพลาด", "โปรดทำการเข้าสู่ระบบก่อน", "error", "#e10000").then(() => {
                     navigate("/home")
                  })
               }else if (res === "มีข้อผิดพลาดของเซิฟเวอร์" || res === "มีข้อผิดพลาดของบราวเซอร์"){
                  createSwal("เกิดข้อผิดพลาด", `${res} ทำการเข้าสู่ระบบอีกครั้ง`, "error", "#e10000").then(() => {
                     navigate("/login")
                  })
               }else if (res === "refreshToken หมดอายุ"){
                  createSwal("ขาดการเชื่อมต่อ", `โปรดทำการเข้าสู่ระบบใหม่`, "warning", "#ec9e18").then(() => {
                     navigate("/home")
                  })
               }else if (res.message === "renew token success") {
                  cookie.set("accessToken",res.accessToken,{path:"/"})
                  cookie.set("refreshToken",res.refreshToken,{path:"/"})
                  navigate("/profile")
               }
            })
         }else {
            const informationMember:InformationDisplay = res as InformationDisplay
            
            if (informationMember.username) {
               console.log(informationMember.displayName)
               usernameEl.current!.value = informationMember.username
               displayNameMemberEl.current!.value = informationMember.displayName
               emailEl.current!.value = informationMember.email as string
               setStatus("member")
            }else {
               facebookIdEl.current!.value = informationMember.facebookId as string
               displayNameFacebookEl.current!.value = informationMember.displayName
               facebookNameEl.current!.value = informationMember.facebookName as string
               setStatus("facebook")
            }
         }
      })
      return () => {}
  }, [])

   return (
      <main>
         <div className="max-w-[1400px] w-full mx-auto p-6">
            <h3 className="text-3xl lg:text-4xl font-bold text-center">ข้อมูลและประวัติผู้ใช้งาน</h3>

            <div className=" mt-8 flex flex-col items-center">
               <div className="mb-8">
                  <img src={avatar} alt="avatar" className="max-w-[300px] w-full" />
               </div>

               <div className={`${status === "member" ? "block" : "hidden"} max-w-lg w-full`}>
                  <InlineProfile title="Username" type="text" refer={usernameEl} />
                  <InlineProfile title="DisplayName" type="text" refer={displayNameMemberEl} />
                  <InlineProfile title="Email" type="text" refer={emailEl} />
               </div>
               <div className={`${status === "facebook" ? "block" : "hidden"} max-w-lg w-full`}>
                  <InlineProfile title="FacebookId" type="text" refer={facebookIdEl} />
                  <InlineProfile title="DisplayName" type="text" refer={displayNameFacebookEl} />
                  <InlineProfile title="FacebookName" type="text" refer={facebookNameEl} />
               </div>
               
               
               <div className=" flex flex-col gap-y-2 max-w-md w-full mb-4">
                  <label className="text-xl">รายการบอร์ดที่เคยประเมิน</label>
                  <ListBoardGame title="เกมยิงม้า" status={4}/>
                  <ListBoardGame title="เกมหั่นผักชี" status={2}/>
                  <ListBoardGame title="เกมอัศวินรัตติกาล" status={1}/>
               </div>
            </div>
            <div className="mt-8 flex flex-col gap-y-2 items-center telephone:flex-row justify-center gap-x-4">
               <NavLink to="/page/home" className="w-full telephone:w-[130px]"><Button title="ย้อนกลับ" color="bg-redrose" hover="bg-red-800" shadow="red-400"/></NavLink>
               <Button title="เปลี่ยนรหัสผ่าน" color="bg-limegreen" hover="bg-green-500" shadow="green-400"/>
               <Button title="แก้ไขข้อมูล" color="bg-yellow-400" hover="bg-yellow-500" shadow="yellow-400"/>
            </div>
         </div>
      </main>
   )
}

// declare interface for InlineProfile
interface InlineProfileProps {
   title:string
   type:string
   refer:React.RefObject<HTMLInputElement>
   content?:string|null
}

const InlineProfile = ({ title , type , refer , content=null }:InlineProfileProps) => {
   return (
      <div className="flex flex-col gap-y-2 max-w-md w-full mx-auto mb-4">
         <label className="text-xl">{title} {<span className="text-gray-400 text-base">{content}</span>}</label>
         <input type={type} disabled={true} ref={refer} className="max-w-lg w-full rounded-md border-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-400"/>
      </div>
   )
}

// declare interface for ListBoardGame
interface ListBoardGameProps {
   title:string
   status:number
}

const ListBoardGame = ({ title , status }:ListBoardGameProps) => {
   let color:string = ""
   if (status >= 4) {
      color = "bg-green-700"
   }else if (status >= 2) {
      color = "bg-green-500"
   }else {
      color = "bg-green-400"
   }
   
   return (
      <div className="flex justify-center items-center gap-x-10">
         <div className="text-lg flex-grow flex-shrink-0">{title}</div>
         <div>
            <div className={`${color} text-white rounded w-12 h-7 flex justify-center items-center`}>{status} ดาว</div>
         </div>
      </div>
   )
}

// declare inteface button
interface ButtonProps {
   title:string
   color:string
   hover:string
   shadow:string
}

const Button = ({ title , color , hover , shadow }:ButtonProps) => {
   return <button className={`${color} w-full telephone:w-[130px] py-2 shadow shadow-${shadow} rounded text-white hover:${hover} transition-colors duration-200 ease-in`}>{title}</button>
}

export default Profile
