// import library
import { useEffect, useContext, useState } from "react"
import Cookies from "universal-cookie"
import { useNavigate , NavigateFunction , NavLink } from "react-router-dom"

// import api
import GetMemberApi from "../../api/getMemberApi"
import PopularBoardgameApi from "../../api/popularBoardgameApi"

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

// declare interface for popular boardgame
interface ListBoardGameItem {
    name:string
    picture:string
    year:string
    id:string
}

// declare variable from .env
const web_boardgame = import.meta.env.VITE_WEBBORADGAME

function HomeAfter() {
    const cookie = new Cookies()
    const navigate:NavigateFunction = useNavigate()
    const context = useContext(Store)
  
    const accessToken: string = cookie.get("accessToken")
    const refreshToken:string = cookie.get("refreshToken")

    // ตัวแปรไว้เช็คตอนเข้าหน้าแรกว่าเข้าถูกวิธีหรือไม่
    const [approvePage,setApprovePage] = useState<boolean>(false)

    // ตัวแปรในการเก็บรายการบอร์ดเกมยอดนิยม
    const [popularBoardGame,setPopularBoardGame] = useState<ListBoardGameItem[]>([])

    // หลังจาก render ก็ดึงข้อมูลบอร์ดเกมยอดนิยมมาแสดงผล
    useEffect(() => {
        PopularBoardgameApi().then((res) => {
            if (!(typeof res === "string") && !(typeof res === "undefined")) {
                setPopularBoardGame(res)
            }
        })
    },[])

    
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
                            cookie.remove("accessToken",{path:"/"})
                            cookie.remove("refreshToken",{path:"/"})
                            navigate("/home")
                        })
                    }else if (res.message === "renew token success") {
                        cookie.set("accessToken",res.accessToken,{path:"/"})
                        cookie.set("refreshToken",res.refreshToken,{path:"/"})
                        navigate("/page/home")
                    }
                })
            }else {
                context?.setDisplayName((res as StoreInterface).displayName)
                setApprovePage(true)
            }
        })
        return () => {}
    }, []);


    if (approvePage) {
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
                                <button className='border-2 border-gray-800 p-2 font-medium text-xl rounded-md ml-0 mt-3 telephone:ml-4 telephone:mt-0 hover:bg-slate-100 transition-colors duration-150 ease-in'>
                                    <NavLink to="/page/party">ระบบค้นหาผู้เล่น</NavLink> 
                                </button>
                            </div>
                        </div>
    
                        <div className='flex justify-center order-1 w-full specific:justify-end specific:w-[45%] specific:order-2'>
                            <img src="/picture1.jpg" alt="picture1" className='max-w-[450px] w-full rounded-3xl specific:max-w-[550px] shakeAnimation' />
                        </div>
                    </div>
    
                    <div className='mt-36 lg:mt-[245px]'>
                        <h3 className='font-bold text-2xl telephone:text-4xl mb-12'>บอร์ดเกมยอดนิยม</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16'>
                            {popularBoardGame.map((e,i) => {
                                return <ItemPopular key={i} name={e.name} picture={e.picture} year={e.year} id={e.id} index={i} />
                            })}
                        </div>
                    </div>
                </div>
                <Footer/>
            </main>
        )
    }else {
        return <div className="fixed top-0 left-0 right-0 bottom-0 bg-white"></div>
    }
}

// declare interface for ItemPopular
interface ItemPopularProps {
    name:string
    picture:string
    year:string
    id:string
    index:number
}

const ItemPopular = ({name, picture, year, id, index}:ItemPopularProps) => {
    return (
        <div className="flex flex-col items-center">
            <div className='max-w-[270px] w-full h-[250px] rounded-xl'>
                <a href={`${web_boardgame}/${id}`} target="_blank">
                    <img src={picture} alt="picture1" className='w-full h-full rounded-xl object-fill cursor-pointer hover:scale-[1.03] transition-transform ease-in duration-75' />
                </a>
            </div>
            <div className='max-w-[260px] w-full mt-5'>
                {index === 0 || index === 1 || index === 2 ? <div className='w-[65px] h-[25px] inline-block rounded-full bg-orange-500 shadow shadow-orange-800 text-white mb-4 text-center flashingAnimation'>มาแรง {index+1}</div> : null }
                <h4 className='text-2xl font-semibold'>
                    {index+1}. {name}
                </h4>
                <p className='text-xl font-normal text-gray-400 mt-1'>{year}</p>
            </div>
        </div>
    )
}

export default HomeAfter
