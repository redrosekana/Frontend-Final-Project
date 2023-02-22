// import library
import { useEffect,useContext } from "react"
import Cookies from "universal-cookie"
import { useNavigate , NavigateFunction , NavLink } from "react-router-dom"

// import api
import GetMemberApi from "../../api/getMemberApi"

// import controller
import { createSwal } from "../../controller/createSwal"

// import components
import Footer from "../footer"

// import context api
import { Store } from "../../context/store"

const amountItem:number[] = []
for (let i=1;i<=10;i++){
    amountItem.push(i)
}

// declare interface for context api
interface StoreInteface {
    message: string;
    displayName:string;
    username:string;
    email:string
}

function HomeAfter() {
    const cookie = new Cookies()
    const navigate:NavigateFunction = useNavigate()
    const context = useContext(Store)
  
    const accessToken: string = cookie.get("accessToken")
    const refreshToken:string = cookie.get("refreshToken")

    useEffect(() => {
        window.scrollTo(0,0)

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
                GetMemberApi(refreshToken,"/renewUser").then((res:any) => {
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
                        navigate("/page/home")
                    }else{
                        window.location.reload()
                    }
                })
            }else {
                context?.setDisplayName((res as StoreInteface).displayName)
            }
        })
        return () => {}
    }, []);

    return (
        <main>
            <div className='mt-12 mb-4 max-w-[1400px] mx-auto px-5'>
                <div className='flex flex-col specific:flex-row'>
                    <div className='flex flex-col justify-center order-2 text-center mt-8 w-full specific:w-[55%] specific:order-1 specific:mt-0 specific:text-start'>
                        <h3 className='font-bold text-2xl telephone:text-4xl lg:text-5xl'>Board Game RecCommu</h3>
                        <p className='mt-4 text-xl text-slate-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque esse ab ipsam blanditiis quaerat odit exercitationem necessitatibus totam rem omnis tempore vitae quos odio, deserunt tempora sunt enim quo! Quibusdam?</p>
                        <div className='mt-4 flex flex-col telephone:block'>
                        <button className='bg-orangey p-2 font-medium text-xl rounded-md text-white hover:bg-orange-500 transition-colors duration-150 ease-in'>
                                <NavLink to="/page/recommend">ระบบแนะนำบอร์ดเกม</NavLink>
                            </button>
                            <button className='border-2 border-black p-2 font-medium text-xl rounded-md ml-0 mt-3 telephone:ml-4 telephone:mt-0 hover:bg-slate-100 transition-colors duration-150 ease-in'>
                                <NavLink to="/page/party">ระบบค้นหาผู้เล่น</NavLink> 
                            </button>
                        </div>
                    </div>

                    <div className='flex justify-center order-1 w-full specific:justify-end specific:w-[45%] specific:order-2'>
                        <img src="/picture1.jpg" alt="picture1" className='max-w-[450px] w-full rounded-3xl specific:max-w-[550px] shakeAnimation' />
                    </div>
                </div>

                <div className='mt-20'>
                    <h3 className='font-bold text-2xl telephone:text-4xl'>บอร์ดเกมยอดนิยม</h3>
                    <div>
                        {amountItem.map((e,i) => {
                            return <ItemPopular key={i} detail={e} index={i}/>
                        })}
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    )
}

// declare interface for ItemPopular
interface ItemPopularProps {
    detail:number,
    index:number
}

const ItemPopular = ({detail,index}:ItemPopularProps) => {
    
    let pictureTmp:React.ReactNode
    if (index % 4 === 0){
        pictureTmp = <img src="/picture2.jpg" alt="picture1" className='w-[320px] sm:w-[220px] rounded-md' />
    }else if (index % 4 === 1) {
        pictureTmp = <img src="/picture3.jpg" alt="picture2" className='w-[320px] sm:w-[220px] rounded-md' />
    }else if (index % 4 === 2) {
        pictureTmp = <img src="/picture4.jpg" alt="picture3" className='w-[320px] sm:w-[220px] rounded-md' />
    }else if (index % 4 === 3) {
        pictureTmp = <img src="/picture5.jpg" alt="picture3" className='w-[320px] sm:w-[220px] rounded-md' />
    }

    return (
        <div className="flex flex-col sm:flex-row items-center border-b-2 border-b-gray-300 my-8 pb-4">
            <div>{pictureTmp}</div>
            <div className='flex-grow ml-16 sm:ml-8  mt-8 sm:mt-0'>
                <h4 className='text-2xl font-semibold'>Board Game {detail}</h4>
                <p className='text-lg text-gray-400'>2022</p>
                <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            </div>
        </div>
    )
}

export default HomeAfter
