// import library
import { useEffect, useContext, useState } from "react"
import Cookies from "universal-cookie"
import { useNavigate , NavigateFunction } from "react-router-dom"

// import api
import GetMemberApi from "../../api/getMemberApi"

// import controller
import { createSwal } from "../../controller/createSwal"

// import components
import Footer from "../footer"

// import context api
import { Store } from "../../context/store"

// declare interface for context api
interface StoreInterface {
    message: string;
    displayName:string;
    username:string;
    email:string
}

function AboutAfter() {
    const cookie = new Cookies();
    const navigate:NavigateFunction = useNavigate();
    const context = useContext(Store)

    // ตัวแปรไว้เช็คตอนเข้าหน้าแรกว่าเข้าถูกวิธีหรือไม่
    const [approvePage,setApprovePage] = useState<boolean>(false)
  
    const accessToken: string = cookie.get("accessToken")
    const refreshToken:string = cookie.get("refreshToken")

    useEffect(() => {
        window.scrollTo(0,0)

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
                        navigate("/page/about")
                    }
                })
            }else {
                context?.setDisplayName((res as StoreInterface).displayName)
                setApprovePage(true)
            }
        })
        return () => {}
    }, [])

    if (approvePage) {
        return (
            <main>
                <div className='mt-20 sm:mt-32 px-5 max-w-[1400px] mx-auto'>
                    <ItemAbout order={0} img={"/about1.svg"} title={"ระบบแนะนำบอร์ดเกมของเรา"} content={"หากคุณเป็นคนที่ไม่เคยเล่นบอร์ดเกมแต่สนใจที่จะลองเล่นหรือเป็นผู้เล่นที่ชอบเล่นบอร์ดเกมอยู่แล้ว ต้องการที่จะหาบอร์ดเกมใหม่ ๆ ไม่ว่าจะเป็นเกมแนวเดิม หรือเกมแนวแปลกใหม่ มาลองใช้ระบบแนะนำบอร์ดเกมของเว็บไซต์เราดูสิ เพียงแค่คุณใส่ข้อมูลเกมที่คุณต้องการ ระบบของเราก็จะแนะนำเกมให้คุณ แม้คุณจะเป็นผู้เล่นใหม่ก็สามารถใช้งานได้ไม่ยาก"}/>
                    <ItemAbout order={1} img={"/about2.svg"} title={"หากคุณมองหาผู้เล่นบอร์ดเกม"} content={"หากบอร์ดเกมที่คุณต้องการเล่นนั้นไม่สามารถที่จะเล่นคนเดียวได้ และคุณยังไม่มีกลุ่มเพื่อนที่จะเล่นด้วย คุณสามารถค้นหาผู้เล่นที่มีความสนใจเหมือนกันด้วยระบบปาร์ตี้ของเรา ที่จะทำให้คุณสามารถสร้างปาร์ตี้เพื่อให้ผู้อื่นมาเข้าร่วมกับคุณและคุณก็สามารถเข้าร่วมกับปาร์ตี้ผู้อื่นได้เช่นกัน"}/>
                    <ItemAbout order={2} img={"/about3.svg"} title={"ค้นหาร้านบอร์ดเกมที่ผู้เล่นต้องการ"} content={"เคยหรือไม่ แม้จะมีเพื่อนเล่นและมีเกมในดวงใจ แต่ไม่รู้จะไปเล่นที่ไหน เว็บไซต์ของเรามีระบบแนะนำร้านบอร์ดเกมใกล้เคียง เพียงแค่คุณใส่สถานที่ปัจจุบันของคุณ ระบบของเราจะทำการค้นหาและแนะนำร้านบอร์ดเกมที่อยู่ใกล้กับคุณมากที่สุด"}/>
                    <ItemAbout order={3} img={"/about4.svg"} title={"ประเมินเพื่ออนาคตที่ดี"} content={"เมื่อคุณทำการประเมินเกมที่คุณได้รับการแนะนำไปหรือใส่ข้อมูลเพิ่มว่าคุณเคยเล่นเกมอะไรมาบ้าง เว็บไซต์ของเราจะทำการเก็บข้อมูลดังกล่าว เพื่อนำไปปรับปรุงประสิทธิภาพการแนะนำให้เหมาะสมกับคุณมากขึ้น"}/>
                </div>
                <Footer/>
            </main>
        )
    }else {
        return <div className="border border-black fixed top-0 left-0 right-0 bottom-0 bg-white"></div>
    }
    
}

// declare interface for ItemAbout
interface ItemAboutProps {
    order:number,
    img:string,
    title:string,
    content:string
}

const ItemAbout = ({ order,img,title,content }:ItemAboutProps) => {
    return (
        <div className='flex flex-col md:flex-row mb-20 md:mb-32 lg:mb-48'>
            <div className={`flex justify-center ${ order % 2 === 0  ? 'md:order-1' : 'md:order-2'}`}>
                <img src={img} alt="about1" className='w-[350px] md:w-[500px] lg:w-[650px] xl:w-[800] rounded-2xl ' />
            </div>
            <div className={`w-full ${ order % 2 === 0  ? 'md:order-2' : 'md:order-1'}`}>
                <h3 className={`mt-6 ml-4 md:mt-0 ${order % 2 === 0 ? 'md:ml-4 lg:ml-10' : 'md:mr-4 lg:mr-10' }  font-bold text-2xl md:text-2xl lg:text-3xl xl:text-5xl`}>{title}</h3>
                <p className={`mt-3 ml-6 md:mt-4 lg:mt-6 ${order % 2 === 0 ? 'md:ml-6 lg:ml-12' : 'md:mr-6 lg:mr-12' } text-gray-500 text-lg md:text-lg lg:text-xl xl:text-2xl leading-relaxed xl:leading-relaxed`}>{content}</p>
            </div>
        </div>
    )
}
export default AboutAfter
