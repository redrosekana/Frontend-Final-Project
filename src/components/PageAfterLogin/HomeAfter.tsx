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
}

function HomeAfter() {
    const cookie = new Cookies()
    const navigate:NavigateFunction = useNavigate()
    const context = useContext(Store)
  
    const accessToken: string = cookie.get("accessToken")
    const refreshToken:string = cookie.get("refreshToken")

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
                        navigate("/page/home")
                    }
                })
            }else {
                context?.setDisplayName((res as StoreInterface).displayName)
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
                    {popularBoardGame.map((e:any,i:number) => {
                        return <ItemPopular key={i} name={e.name} picture={e.picture} year={e.year} index={i} />
                    })}
                </div>
            </div>
            <Footer/>
        </main>
    )
}

// declare interface for ItemPopular
interface ItemPopularProps {
    name:string
    picture:string
    year:string
    index:number
}

const ItemPopular = ({name, picture, year, index}:ItemPopularProps) => {
    return (
        <div className="flex flex-col sm:flex-row items-center my-8 pb-5 border-b-2 border-b-gray-300">
            <div>
                <img src={picture} alt="picture1" className='w-[300px] sm:w-[200px] sm:h-[200px] rounded-md object-fill' />
            </div>
            <div className='mt-6 w-full max-w-[350px] sm:mt-0 sm:ml-4 sm:flex-grow sm:max-w-full sm:w-auto'>
                {index === 0 || index === 1 || index === 2 ? <div className='sm:ml-4 w-[65px] h-[25px] inline-block rounded-full bg-orange-500 shadow shadow-orange-800 text-white mb-4 text-center cursor-pointer flashingAnimation'>มาแรง {index+1}</div> : null }
                <h4 className='sm:ml-4 text-2xl font-semibold'>
                    {index+1}. {name}
                </h4>
                <p className='sm:ml-4 text-lg text-gray-400'>{year}</p>
                <p className='sm:ml-4 text-lg mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                
            </div>
        </div>
    )
}

export default HomeAfter
