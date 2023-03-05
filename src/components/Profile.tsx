// import library
import React , { useEffect,useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import avatar from "../assets/avatar.svg"
import Cookies from "universal-cookie"
import { useNavigate , NavigateFunction } from "react-router-dom"

import Swal from "sweetalert2"

import { Modal } from "flowbite-react"

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

type Status = "facebook" | "user" | null

function Profile() {
   const cookie = new Cookies();
   const navigate:NavigateFunction = useNavigate();

   // ตัวแปรไว้เช็คว่า member เป็น user หรือ facebook
   const [status,setStatus] = useState<Status>(null)

   // const [warningPassword,setWarningPassword] = useState<boolean[]>([false,false,false])

   // ตัวแปรควบคุมการเปิดปิด modal
   const [modalPassword,setModalPassword] = useState<boolean>(false)
   const [modalInfomation,setModalInfomation] = useState<boolean>(false)

   const accessToken:string = cookie.get("accessToken")
   const refreshToken:string = cookie.get("refreshToken")

   const usernameEl = useRef<HTMLInputElement>(null)
   const displayNameUserEl = useRef<HTMLInputElement>(null)
   const displayNameFacebookEl = useRef<HTMLInputElement>(null)
   const emailEl = useRef<HTMLInputElement>(null)
   const facebookIdEl = useRef<HTMLInputElement>(null)
   const facebookNameEl = useRef<HTMLInputElement>(null)

   const passwordOldEl = useRef<HTMLInputElement>(null)
   const passwordNewEl = useRef<HTMLInputElement>(null)
   const confirmPasswordNewEl = useRef<HTMLInputElement>(null)

   const updateDisplayNameUserEl = useRef<HTMLInputElement>(null)
   const updateEmailEl = useRef<HTMLInputElement>(null)

   const updateDisplayNameFacebookEl = useRef<HTMLInputElement>(null)
   
   
   useEffect(() => {
      GetMemberApi(accessToken,"/member").then((res) => {
         if (res === "รูปแบบการส่งไม่ถูกต้อง" || res === "accessToken ไม่มีสิทธิเข้าถึง"){
            createSwal("เกิดข้อผิดพลาด", "โปรดทำการเข้าสู่ระบบก่อน", "error", "#e10000").then(() => {
               navigate("/home")
            })
         }else if (res === "มีข้อผิดพลาดของเซิฟเวอร์" || res === "มีข้อผิดพลาดของบราวเซอร์"){
            createSwal("เกิดข้อผิดพลาด", `${res} ทำการเข้าสู่ระบบอีกครั้ง`, "error", "#e10000").then(() => {
               navigate("/login")
            })
         }else if (res === "accessToken หมดอายุ"){
            GetMemberApi(refreshToken,"/token").then((res:any) => {
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
               usernameEl.current!.value = informationMember.username
               displayNameUserEl.current!.value = informationMember.displayName
               emailEl.current!.value = informationMember.email as string

               updateDisplayNameUserEl.current!.value = informationMember.displayName
               updateEmailEl.current!.value = informationMember.email as string

               updateDisplayNameUserEl.current!.defaultValue = informationMember.displayName
               updateEmailEl.current!.defaultValue = informationMember.email as string
               setStatus("user")
            }else {
               facebookIdEl.current!.value = informationMember.facebookId as string
               displayNameFacebookEl.current!.value = informationMember.displayName
               facebookNameEl.current!.value = informationMember.facebookName as string
               
               displayNameFacebookEl.current!.value = informationMember.displayName
               setStatus("facebook")
            }
         }
      })
      return () => {}
  }, [])


   // ฟังชันก์ในการควบคุมเปิดปิด modal
   const onOpenPassword = () => setModalPassword(prev => !prev)
   const onClosePassword = () => {
      passwordOldEl.current!.value = ""
      passwordNewEl.current!.value = ""
      confirmPasswordNewEl.current!.value = ""
      // setWarningPassword([false,false,false])
      setModalPassword(false)
   }

   const onOpenInformation = () => setModalInfomation(prev => !prev)
   const onCloseInformation = () => {
      updateDisplayNameUserEl.current!.value = updateDisplayNameUserEl.current!.defaultValue
      updateEmailEl.current!.value = updateEmailEl.current!.defaultValue
      updateDisplayNameFacebookEl.current!.value = updateDisplayNameFacebookEl.current!.defaultValue
      setModalInfomation(false)
   }

   const clickUpdatePassword = () => {
      // const listWarning:boolean[] = [false,false,false]
      // if (!passwordOldEl.current?.value) listWarning[0] = true
      // if (!passwordNewEl.current?.value) listWarning[1] = true
      // if (!confirmPasswordNewEl.current?.value) listWarning[2] = true
      // setWarningPassword(listWarning)

      if (!passwordOldEl.current?.value || !passwordNewEl.current?.value || !confirmPasswordNewEl.current?.value) {
         createSwal("แจ้งเตือน", "โปรดกรอกข้อมูลให้ครบ", "warning", "#ec9e18")
         return
      }

      if (passwordNewEl.current?.value !== confirmPasswordNewEl.current?.value) {
         createSwal("แจ้งเตือน", "รหัสผ่านใหม่ไม่ตรงกัน", "warning", "#ec9e18")
         return
      }
   }

   const clickUpdateInformation = (status:Status) => {
      if (status === "user") {
         if (!updateDisplayNameUserEl.current?.value || !updateEmailEl.current?.value) {
            createSwal("แจ้งเตือน", "โปรดกรอกข้อมูลให้ครบ", "warning", "#ec9e18")
            return
         }

         if (updateDisplayNameUserEl.current?.value === updateDisplayNameUserEl.current?.defaultValue
         && updateEmailEl.current?.value === updateEmailEl.current?.defaultValue) {
            createSwal("แจ้งเตือน", "ข้อมูลไม่มีการเปลี่ยนแปลง", "warning", "#ec9e18").then(() => {
               setModalInfomation(false)
               return
            })
         }

      }else {
         if (!updateDisplayNameFacebookEl.current?.value) {
            createSwal("แจ้งเตือน", "โปรดกรอกข้อมูลให้ครบ", "warning", "#ec9e18")
            return
         }
      }
   }

   return (
      <main>
         <div className="max-w-[1400px] w-full mx-auto p-6">
            <h3 className="text-3xl lg:text-4xl font-bold text-center">ข้อมูลและประวัติผู้ใช้งาน</h3>

            <div className=" mt-8 flex flex-col items-center">
               <div className="mb-8">
                  <img src={avatar} alt="avatar" className="max-w-[300px] w-full" />
               </div>

               <div className={`${status === "user" ? "block" : "hidden"} max-w-lg w-full`}>
                  <InlineProfile title="Username" type="text" refer={usernameEl} />
                  <InlineProfile title="DisplayName" type="text" refer={displayNameUserEl} />
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
               <NavLink to="/page/home" className="w-full telephone:w-[130px]"><Buttont title="ย้อนกลับ" color="bg-redrose" hover="bg-red-800" shadow="red-400"/></NavLink>
               <Buttont onClick={onOpenPassword} title="เปลี่ยนรหัสผ่าน" color="bg-limegreen" hover="bg-green-500" shadow="green-400"/>
               <Buttont onClick={onOpenInformation} title="แก้ไขข้อมูล" color="bg-yellow-400" hover="bg-yellow-500" shadow="yellow-400"/>
            </div>

            <Modal show={modalPassword} onClose={onClosePassword}>
               <Modal.Header>
                  <h3 className="text-2xl">เปลี่ยนรหัสผ่าน</h3>
               </Modal.Header>
               <Modal.Body>
                  <form>
                     <InputElement type="password" title="รหัสผ่านเดิม" refer={passwordOldEl}/>
                     <InputElement type="password" title="รหัสผ่านใหม่" refer={passwordNewEl}/>
                     <InputElement type="password" title="ยืนยันรหัสผ่านใหม่" refer={confirmPasswordNewEl}/>
                  </form>
               </Modal.Body>
               <Modal.Footer>
                  <button onClick={clickUpdatePassword} className="w-20 rounded-md text-white bg-limegreen hover:bg-green-500 focus:ring-1 focus:border-green-400 focus:outline-none focus:ring-green-400 p-2 transition duration-150 ease-in">ยืนยัน</button>
                  <button onClick={onClosePassword} className="w-20 rounded-md text-white bg-redrose hover:bg-red-800 focus:ring-1 focus:border-red-600 focus:outline-none focus:ring-red-600 p-2 transition duration-150 ease-in">ยกเลิก</button>
               </Modal.Footer>
            </Modal>

            <Modal show={modalInfomation} onClose={onCloseInformation}>
               <Modal.Header>
                  <h3 className="text-2xl">แก้ไขข้อมูลผู้ใช้งาน</h3>
               </Modal.Header>
               <Modal.Body>
                  <form>
                     <div className={`${status === "user" ? "block" : "hidden"}`}>
                        <InputElement type="text" title="ชื่อเล่น" refer={updateDisplayNameUserEl}/>
                        <InputElement type="text" title="อีเมลล์" refer={updateEmailEl}/>
                     </div>

                     <div className={`${status === "facebook" ? "block" : "hidden"}`}>
                        <InputElement type="text" title="ชื่อเล่น" refer={updateDisplayNameFacebookEl}/>
                     </div>
                  </form>
               </Modal.Body>
               <Modal.Footer>
                  <button onClick={() => clickUpdateInformation(status)} className="w-20 rounded-md text-white bg-limegreen hover:bg-green-500 focus:ring-1 focus:border-green-400 focus:outline-none focus:ring-green-400 p-2 transition duration-150 ease-in">ยืนยัน</button>
                  <button onClick={onCloseInformation} className="w-20 rounded-md text-white bg-redrose hover:bg-red-800 focus:ring-1 focus:border-red-600 focus:outline-none focus:ring-red-600 p-2 transition duration-150 ease-in">ยกเลิก</button>
               </Modal.Footer>
            </Modal>
         </div>
      </main>
   )
}

// declare interface for InlineProfile
interface InlineProfileProps {
   title:string
   type:string
   refer:React.RefObject<HTMLInputElement>
}

const InlineProfile = ({ title, type, refer }:InlineProfileProps) => {
   return (
      <div className="flex flex-col gap-y-2 max-w-md w-full mx-auto mb-4">
         <label className="text-xl">{title}</label>
         <input type={type} disabled={true} ref={refer} className="max-w-lg w-full rounded-md border-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-400"/>
      </div>
   )
}

// declare interface for ListBoardGame
interface ListBoardGameProps {
   title:string
   status:number
}

const ListBoardGame = ({ title, status }:ListBoardGameProps) => {
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
   onClick?():void
}

const Buttont = ({ title, color, hover, shadow, onClick }:ButtonProps) => {
   return <button onClick={onClick} className={`${color} w-full telephone:w-[130px] py-2 shadow shadow-${shadow} rounded text-white hover:${hover} transition-colors duration-200 ease-in`}>{title}</button>
}

interface InputElementProps extends InlineProfileProps {
   warning?:boolean
}

const InputElement = ({title, type, refer, warning}:InputElementProps) => {
   return (
      <div className="mb-3">
         <label className="block mb-2 text-lg font-medium text-gray-900">{title}</label>
         <input ref={refer} type={type} className="bg-slate-50 border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-blue-700 focus:border-blue-700 w-full p-3"/>
         <div className="text-red-800 mt-1">{warning ? "ยังไม่ได้กรอกข้อมูลฟิลนี้" : null}</div>
      </div>
   )
}

export default Profile
