// import library
import React , { useEffect,useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import avatar from "../assets/avatar.svg"
import Cookies from "universal-cookie"
import { useNavigate , NavigateFunction } from "react-router-dom"

// import component react flowbite 
import { Modal } from "flowbite-react"

// import component
import Reload from "./reload"

// import api
import GetMemberApi from "../api/getMemberApi"
import UpdatePassword from "../api/updatePassword"
import UpdateMember from "../api/updateMember"

// import controller
import { createSwal } from "../controller/createSwal"
import { ValidateEmail } from "../controller/formatEmail"

// declare interface for display information user
interface InformationDisplay {
   message: string;
   displayName:string;
   username?:string;
   email?:string
   facebookId?:string;
   facebookName?:string
}

// declare interface for warning fields that user don't put
interface WarningModal {
   status:boolean
   text:string
}

// declate interface for user that login either facebook or user
type Status = "facebook" | "user" | null

function Profile() {
   const cookie = new Cookies()
   const navigate:NavigateFunction = useNavigate()

   const [reload,setReload] = useState<boolean>(false)

   // ตัวแปรไว้เช็คว่า member เป็น user หรือ facebook
   const [status,setStatus] = useState<Status>(null)

   // ตัวแปรไว้ทำการเช็คกรณี member ใส่ข้อมูลได้ไม่ถูกต้อง
   const [warningOldPassword,setWarningOldPassword] = useState<WarningModal>({status:false,text:""})
   const [warningNewPassword,setWarningNewPassword] = useState<WarningModal>({status:false,text:""})
   const [warningConfirmNewPassword,setWarningConfirmNewPassword] = useState<WarningModal>({status:false,text:""})

   // ตัวแปรไว้ทำการเช็คกรณี member ใส่ข้อมูลได้ไม่ถูกต้อง
   const [warningDisplayNameUser,setWarningDisplayNameUser] = useState<WarningModal>({status:false,text:""})
   const [warningEmail,setWarningEmail] = useState<WarningModal>({status:false,text:""})
   const [warningDisplayNameFacebook,setWarningDisplayNameFacebook] = useState<WarningModal>({status:false,text:""})

   // ตัวแปรควบคุมการเปิดปิด modal
   const [modalPassword,setModalPassword] = useState<boolean>(false)
   const [modalInfomation,setModalInfomation] = useState<boolean>(false)

   // token
   const accessToken:string = cookie.get("accessToken")
   const refreshToken:string = cookie.get("refreshToken")

   // ค่าที่ผูกกับ element แสดงข้อมูลผ้ใช้
   const usernameEl = useRef<HTMLInputElement>(null)
   const displayNameUserEl = useRef<HTMLInputElement>(null)
   const displayNameFacebookEl = useRef<HTMLInputElement>(null)
   const emailEl = useRef<HTMLInputElement>(null)
   const facebookIdEl = useRef<HTMLInputElement>(null)
   const facebookNameEl = useRef<HTMLInputElement>(null)

   // ค่าที่ผูกข้อมูลที่เอาไว้แก้ไข password
   const passwordOldEl = useRef<HTMLInputElement>(null)
   const passwordNewEl = useRef<HTMLInputElement>(null)
   const confirmPasswordNewEl = useRef<HTMLInputElement>(null)

   // ค่าที่ผูกข้อมูลที่เอาไว้แก้ไข information user
   const updateDisplayNameUserEl = useRef<HTMLInputElement>(null)
   const updateEmailEl = useRef<HTMLInputElement>(null)

   // ค่าที่ผูกข้อมูลที่เอาไว้แก้ไข information facebook
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
            // เก็บค่า information ไว้เพื่อทำการเช็คว่าเป็น user หรือ facebook
            const informationMember:InformationDisplay = res as InformationDisplay
            
            if (informationMember.username) {
               usernameEl.current!.value = informationMember.username
               displayNameUserEl.current!.value = informationMember.displayName
               emailEl.current!.value = informationMember.email as string

               updateDisplayNameUserEl.current!.value = informationMember.displayName
               updateEmailEl.current!.value = informationMember.email as string

               // เก็บค่าเก่าไว้กรณีผู้ใช้งานกดยกเลิก modal จะได้เอาค่าเดิมมาแสดงต่อ
               updateDisplayNameUserEl.current!.defaultValue = informationMember.displayName
               updateEmailEl.current!.defaultValue = informationMember.email as string
               
               // เก็บด้วยว่าเป็น user
               setStatus("user")
            }else {
               facebookIdEl.current!.value = informationMember.facebookId as string
               displayNameFacebookEl.current!.value = informationMember.displayName
               facebookNameEl.current!.value = informationMember.facebookName as string

               updateDisplayNameFacebookEl.current!.value = informationMember.displayName
               
               // เก็บค่าเก่าไว้กรณีผู้ใช้งานกดยกเลิก modal จะได้เอาค่าเดิมมาแสดงต่อ
               updateDisplayNameFacebookEl.current!.defaultValue = informationMember.displayName
               
               // เก็บด้วยว่าเป็น facebook
               setStatus("facebook")
            }
         }
      })
      return () => {}
  }, [])


   // ฟังชันก์เอาไว้รีเซ็ตทุกอย่างเมื่อปิด modal password
   const resetChannelPassword = () => {
      passwordOldEl.current!.value = ""
      passwordNewEl.current!.value = ""
      confirmPasswordNewEl.current!.value = ""
      setWarningOldPassword({status:false,text:""})
      setWarningNewPassword({status:false,text:""})
      setWarningConfirmNewPassword({status:false,text:""})
   }

   // ฟังชันก์เอาไว้รีเซ็ตทุกอย่างเมื่อปิด modal information
   const resetChannelInformation = () => {
      updateDisplayNameUserEl.current!.value = updateDisplayNameUserEl.current!.defaultValue
      updateEmailEl.current!.value = updateEmailEl.current!.defaultValue
      updateDisplayNameFacebookEl.current!.value = updateDisplayNameFacebookEl.current!.defaultValue
      setWarningDisplayNameUser({status:false,text:""})
      setWarningEmail({status:false,text:""})
      setWarningDisplayNameFacebook({status:false,text:""})
   }

   // ฟังชันก์ในการควบคุมการเปิด modal password
   const onOpenPassword = () => setModalPassword(prev => !prev)

   // ฟังชันก์ในการควบคุมการปิด modal password
   const onClosePassword = () => {
      resetChannelPassword()
      setModalPassword(false)
   }

   // ฟังชันก์ในการควบคุมการเปิด modal information
   const onOpenInformation = () => setModalInfomation(prev => !prev)

   // ฟังชันก์ในการควบคุมการเปิด modal information
   const onCloseInformation = () => {
      resetChannelInformation()
      setModalInfomation(false)
   }

   // ฟังชันก์ทำงานเมื่อกดยืนยันการเปลี่ยนรหัสผ่าน
   const clickUpdatePassword = async () => {
      let checkStatus = 0

      // เช็คว่าได้ใส่ค่าไหม
      if (!passwordOldEl.current?.value){
         setWarningOldPassword({status:true,text:"กรอกข้อมูลให้ครบ"})
         checkStatus = 1
      }else {
         setWarningOldPassword({status:false,text:""})
      }

      // เช็คว่าได้ใส่ค่าไหม
      if (!passwordNewEl.current?.value){
         setWarningNewPassword({status:true,text:"กรอกข้อมูลให้ครบ"})
         checkStatus = 1 
      }else {
         setWarningNewPassword({status:false,text:""})
      }

      // เช็คว่าได้ใส่ค่าไหม
      if (!confirmPasswordNewEl.current?.value){
         setWarningConfirmNewPassword({status:true,text:"กรอกข้อมูลให้ครบ"})
         checkStatus = 1
      }else {
         setWarningConfirmNewPassword({status:false,text:""})
      }

      // ถ้าไม่ใส่แสดง warning แจ้งเตือนแล้ว return
      if (checkStatus) return

      // ถ้ารหัสผ่านไม่ตรงกันก็ warning แจ้งเตือน
      if (passwordNewEl.current?.value !== confirmPasswordNewEl.current?.value) {
         setWarningNewPassword({status:true,text:"รหัสผ่านไม่ตรงกัน"})
         setWarningConfirmNewPassword({status:true,text:"รหัสผ่านไม่ตรงกัน"})
         return
      }

      // ถ้ารหัสผ่านไม่ได้มีการเปลี่ยนแปลงให้ปิด modal จากนั้น return แล้วแจ้งเตือน
      if (passwordOldEl.current?.value === passwordNewEl.current?.value) {
         resetChannelPassword()
         setModalPassword(false)
         createSwal("แจ้งเตือน", `รหัสผ่านไม่ได้เปลี่ยนแปลง`, "warning", "#ec9e18")
         return
      }

      // ปิด modal ทำการส่งค่าหา server 
      setModalPassword(false)
      setReload(true)
      const result_one = await UpdatePassword(passwordOldEl.current!.value, passwordNewEl.current!.value, accessToken)
      setReload(false)

      if (result_one === "รูปแบบการส่งไม่ถูกต้อง" 
      || result_one === "accessToken ไม่มีสิทธิเข้าถึง"){
         createSwal("เกิดข้อผิดพลาด", "โปรดกระทำการให้ถูกต้อง", "error", "#e10000").then(() => {
            resetChannelPassword()
         })
      }else if (result_one === "มีข้อผิดพลาดของเซิฟเวอร์" 
      || result_one === "มีข้อผิดพลาดของบราวเซอร์"
      || result_one === "accessToken หมดอายุ"){
         createSwal("เกิดข้อผิดพลาด", `${result_one} โปรดทำการใหม่อีกครั้ง`, "error", "#e10000").then(() => {
            resetChannelPassword()
            window.location.reload()
         })
      }else if (result_one === "ต้องการรหัสผ่านที่จะเปลี่ยน"
      || result_one === "รหัสผ่านเดิมไม่ถูกต้อง") {
         createSwal("แก้ไขไม่สำเร็จ", result_one, "error", "#e10000").then(() => {
            resetChannelPassword()
         })
      }else {
         createSwal("แก้ไขสำเร็จ", "โปรดทำการเข้าสู่ระบบอีกครั้ง", "success", "#06b400").then(() => {
            cookie.remove("accessToken",{path:"/"})
            cookie.remove("refreshToken",{path:"/"})
            window.location.href = "/login"
         })
      }
   }

   // ฟังชันก์ทำงานเมื่อกดยืนยันการเปลี่ยนแปลงข้อมูล
   const clickUpdateInformation = async (status:Status) => {
      let checkStatus = 0

      // เช็คว่าเป็น user หรือ facebook
      if (status === "user") {
         // เช็คว่าได้ใส่ค่าไหม
         if (!updateDisplayNameUserEl.current?.value) {
            setWarningDisplayNameUser({status:true,text:"กรอกข้อมูลให้ครบ"})
            checkStatus = 1
         }else {
            setWarningDisplayNameUser({status:false,text:""})
         }

         // เช็คว่าได้ใส่ค่าไหม
         if (!updateEmailEl.current?.value) {
            setWarningEmail({status:true,text:"กรอกข้อมูลให้ครบ"})
            checkStatus = 1
         }else {
            setWarningEmail({status:false,text:""})
         }

         // เช็คว่าอีเมลล์ถูกรูปแบบไหม
         if (!ValidateEmail(updateEmailEl.current!.value)) {
            setWarningEmail({status:true,text:"รูปแบบอีเมลล์ไม่ถูกต้อง"})
            checkStatus = 1
         }else {
            setWarningEmail({status:false,text:""})
         }

         // ถ้าไม่ถูกต้องและไม่ใส่ค่าก็แสดง warning แจ้งเตือนแล้ว return
         if (checkStatus) return

         // ถ้าข้อมูลไม่ได้มีการเปลี่ยนแปลงให้ปิด modal จากนั้น return แล้วแจ้งเตือน
         if (updateDisplayNameUserEl.current?.value === updateDisplayNameUserEl.current?.defaultValue
         && updateEmailEl.current?.value === updateEmailEl.current?.defaultValue) {
            setModalInfomation(false)
            createSwal("แจ้งเตือน", "ข้อมูลไม่มีการเปลี่ยนแปลง", "warning", "#ec9e18")
            return
         }

         // เตรียมข้อมูลเพื่อส่งไปหา server
         const body = {}

         // ส่งค่าที่ต้องการเปลี่ยนแปลงเท่านั้น
         if (updateDisplayNameUserEl.current?.value !== updateDisplayNameUserEl.current?.defaultValue){
            Object.assign(body,{displayNameUser:updateDisplayNameUserEl.current?.value})
         }

         // ส่งค่าที่ต้องการเปลี่ยนแปลงเท่านั้น
         if (updateEmailEl.current?.value !== updateEmailEl.current?.defaultValue) {
            Object.assign(body,{email:updateEmailEl.current?.value})
         }
         
         setModalInfomation(false)
         setReload(true)
         const result_one = await UpdateMember(body,accessToken)
         setReload(false)

         if (result_one === "รูปแบบการส่งไม่ถูกต้อง" 
         || result_one === "accessToken ไม่มีสิทธิเข้าถึง"){
            createSwal("เกิดข้อผิดพลาด", "โปรดกระทำการให้ถูกต้อง", "error", "#e10000").then(() => {
               resetChannelInformation()
            })
         }else if (result_one === "มีข้อผิดพลาดของเซิฟเวอร์" 
         || result_one === "มีข้อผิดพลาดของบราวเซอร์"
         || result_one === "accessToken หมดอายุ"){
            createSwal("เกิดข้อผิดพลาด", `${result_one} โปรดทำการใหม่อีกครั้ง`, "error", "#e10000").then(() => {
               window.location.reload()
            })
         }else if (result_one === "ต้องการข้อมูลอย่างน้อย 1 ฟิลด์"){
            createSwal("แก้ไขไม่สำเร็จ", result_one, "error", "#e10000").then(() => {
               resetChannelInformation()
            })
         }else if (result_one === "ชื่อแสดงในเว็บไซต์ ถูกใช้งานแล้ว") {
            createSwal("แก้ไขไม่สำเร็จ", result_one, "error", "#e10000").then(() => {
               resetChannelInformation()
            })
         }else if (result_one === "ชื่ออีเมลล์ ถูกใช้งานแล้ว") {
            createSwal("แก้ไขไม่สำเร็จ", result_one, "error", "#e10000").then(() => {
               resetChannelInformation()
            })
         }else {
            createSwal("แก้ไขสำเร็จ", "โปรดทำการเข้าสู่ระบบอีกครั้ง", "success", "#06b400").then(() => {
               cookie.remove("accessToken",{path:"/"})
               cookie.remove("refreshToken",{path:"/"})
               window.location.href = "/login"
            })
         }
      }else {
         if (!updateDisplayNameFacebookEl.current?.value) {
            setWarningDisplayNameFacebook({status:true,text:"กรอกข้อมูลให้ครบ"})
            checkStatus = 1
            return
         }

         if (checkStatus) return

         const body = {}

         if (updateDisplayNameFacebookEl.current?.value !== updateDisplayNameFacebookEl.current?.defaultValue){
            Object.assign(body,{displayNameFacebook:updateDisplayNameFacebookEl.current?.value})
         }

         setModalInfomation(false)
         setReload(true)
         const result_one = await UpdateMember(body,accessToken)
         setReload(false)

         if (result_one === "รูปแบบการส่งไม่ถูกต้อง" 
         || result_one === "accessToken ไม่มีสิทธิเข้าถึง"){
            createSwal("เกิดข้อผิดพลาด", "โปรดกระทำการให้ถูกต้อง", "error", "#e10000").then(() => {
               resetChannelInformation()
            })
         }else if (result_one === "มีข้อผิดพลาดของเซิฟเวอร์" 
         || result_one === "มีข้อผิดพลาดของบราวเซอร์"
         || result_one === "accessToken หมดอายุ"){
            createSwal("เกิดข้อผิดพลาด", `${result_one} โปรดทำการใหม่อีกครั้ง`, "error", "#e10000").then(() => {
               window.location.reload()
            })
         }else if (result_one === "ต้องการข้อมูลอย่างน้อย 1 ฟิลด์"){
            createSwal("แก้ไขไม่สำเร็จ", result_one, "error", "#e10000").then(() => {
               resetChannelInformation()
            })
         }else if (result_one === "ชื่อแสดงในเว็บไซต์ ถูกใช้งานแล้ว") {
            createSwal("แก้ไขไม่สำเร็จ", result_one, "error", "#e10000").then(() => {
               resetChannelInformation()
            })
         }else {
            createSwal("แก้ไขสำเร็จ", "โปรดทำการเข้าสู่ระบบอีกครั้ง", "success", "#06b400").then(() => {
               cookie.remove("accessToken",{path:"/"})
               cookie.remove("refreshToken",{path:"/"})
               window.location.href = "/login"
            })
         }
      }
   }

   return (
      <main>
         {reload ? <Reload/>  : null}
         <div className="max-w-[1400px] w-full mx-auto p-6">
            <h3 className="text-3xl lg:text-4xl font-bold text-center">ข้อมูลและประวัติผู้ใช้งาน</h3>

            <div className=" mt-8 flex flex-col items-center">
               <div className="mb-8">
                  <img src={avatar} alt="avatar" className="max-w-[300px] w-full" />
               </div>

               <div className={`${status === "user" ? "block" : "hidden"} max-w-lg w-full`}>
                  <InlineProfile title="ชื่อผู้ใช้งาน" type="text" refer={usernameEl} />
                  <InlineProfile title="ชื่อที่แสดงในเว็บไซต์" type="text" refer={displayNameUserEl} />
                  <InlineProfile title="อีเมล" type="text" refer={emailEl} />
               </div>
               <div className={`${status === "facebook" ? "block" : "hidden"} max-w-lg w-full`}>
                  <InlineProfile title="ไอดีเฟสบุ๊ค" type="text" refer={facebookIdEl} />
                  <InlineProfile title="ชื่อที่แสดงในเว็บไซต์" type="text" refer={displayNameFacebookEl} />
                  <InlineProfile title="ชื่อเฟสบุ๊ค" type="text" refer={facebookNameEl} />
               </div>
               
               <div className=" flex flex-col gap-y-2 max-w-md w-full mb-4">
                  <label className="text-xl">รายการบอร์ดเกมที่เคยประเมิน</label>
                  <ListBoardGame title="เกมยิงม้า" status={4}/>
                  <ListBoardGame title="เกมหั่นผักชี" status={2}/>
                  <ListBoardGame title="เกมอัศวินรัตติกาล" status={1}/>
               </div>
            </div>
            <div className="mt-8 flex flex-col gap-y-2 items-center telephone:flex-row justify-center gap-x-4">
               <NavLink to="/page/home" className="w-full telephone:w-[130px]"><Buttont title="ย้อนกลับ" color="bg-redrose" hover="bg-red-800" shadow="red-400"/></NavLink>
               {status === "user" ? <Buttont onClick={onOpenPassword} title="เปลี่ยนรหัสผ่าน" color="bg-limegreen" hover="bg-green-500" shadow="green-400"/> : null}
               <Buttont onClick={onOpenInformation} title="แก้ไขข้อมูล" color="bg-yellow-400" hover="bg-yellow-500" shadow="yellow-400"/>
            </div>

            <Modal show={modalPassword} onClose={onClosePassword}>
               <Modal.Header>
                  <div className="text-2xl">เปลี่ยนรหัสผ่าน</div>
               </Modal.Header>
               <Modal.Body>
                  <form>
                     <InputElement type="password" title="รหัสผ่านเดิม" refer={passwordOldEl} warning={warningOldPassword}/>
                     <InputElement type="password" title="รหัสผ่านใหม่" refer={passwordNewEl} warning={warningNewPassword}/>
                     <InputElement type="password" title="ยืนยันรหัสผ่านใหม่" refer={confirmPasswordNewEl} warning={warningConfirmNewPassword}/>
                  </form>
               </Modal.Body>
               <Modal.Footer>
                  <button onClick={clickUpdatePassword} className="w-20 rounded-md text-white bg-limegreen hover:bg-green-500 focus:ring-1 focus:border-green-400 focus:outline-none focus:ring-green-400 p-2 transition duration-150 ease-in">ยืนยัน</button>
                  <button onClick={onClosePassword} className="w-20 rounded-md text-white bg-redrose hover:bg-red-800 focus:ring-1 focus:border-red-600 focus:outline-none focus:ring-red-600 p-2 transition duration-150 ease-in">ยกเลิก</button>
               </Modal.Footer>
            </Modal>

            <Modal show={modalInfomation} onClose={onCloseInformation}>
               <Modal.Header>
                  <div className="text-2xl">แก้ไขข้อมูลผู้ใช้งาน</div>
               </Modal.Header>
               <Modal.Body>
                  <form>
                     <div className={`${status === "user" ? "block" : "hidden"}`}>
                        <InputElement type="text" title="ชื่อเล่น" refer={updateDisplayNameUserEl} warning={warningDisplayNameUser}/>
                        <InputElement type="text" title="อีเมลล์" refer={updateEmailEl} warning={warningEmail}/>
                     </div>

                     <div className={`${status === "facebook" ? "block" : "hidden"}`}>
                        <InputElement type="text" title="ชื่อเล่น" refer={updateDisplayNameFacebookEl} warning={warningDisplayNameFacebook}/>
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
   warning?:WarningModal
}

const InputElement = ({title, type, refer, warning}:InputElementProps) => {
   return (
      <div className="mb-3">
         <label className="block mb-2 text-lg font-medium text-gray-900">{title}</label>
         <input ref={refer} type={type} className="bg-slate-50 border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-blue-700 focus:border-blue-700 w-full p-3"/>
         <div className="text-red-800 mt-1">{warning?.status ? warning.text : null}</div>
      </div>
   )
}

export default Profile
