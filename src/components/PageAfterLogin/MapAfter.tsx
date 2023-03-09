// import library
import { useEffect,useContext,useState } from "react"
import Cookies from "universal-cookie"
import { useNavigate , NavigateFunction } from "react-router-dom"

// import api
import GetMemberApi from "../../api/getMemberApi"

// import controller
import { createSwal } from "../../controller/createSwal"

// import components
import DisplayEntrieMaps from './DisplayEntrieMaps'
import DisplayEntrieMap from './DisplayEntrieMap'
import SearchMap from './SearchMap'

// declare interface for context api
interface StoreInterface {
    message: string;
    displayName:string;
    username:string;
    email:string
}

// import context api
import { Store } from "../../context/store"

// ประกาศ interface ข้อมูลของรายการที่ทำการคำนวณระยะทาง
interface InformationEntrieShops {
    source:string
    destination:string
    flon:number
    flat:number
    tlon:number
    tlat:number
    distance:number
}

// ประกาศ interface ข้อมูลของรายการที่เดียวที่แสดงผล
interface InformationEntrieShop extends InformationEntrieShops {}

function MapAfter() {
    const cookie = new Cookies();
    const navigate:NavigateFunction = useNavigate();
    const context = useContext(Store)
  
    const accessToken: string = cookie.get("accessToken")
    const refreshToken:string = cookie.get("refreshToken")

    // ตัวแปรไว้เช็คตอนเข้าหน้าแรกว่าเข้าถูกวิธีหรือไม่
    const [approvePage,setApprovePage] = useState<boolean>(false)

    // ไว้เก็บรายการข้อมูล ไว้แสดงผลเมื่อคำนวณระยะทาง
    const [entrieShops,setEntrieShops] = useState<InformationEntrieShops[]>([])
    const [entrieShop,setEntrieShop] = useState<InformationEntrieShop | null>(null)

    // ไว้ทำการเก็บ state เพื่อเปลี่ยนแปลงหน้าแสดงผล
    const [statusPageMap,setStatusPageMap] = useState<number>(0)

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
                        navigate("/page/map")
                    }
                })
            }else {
                context?.setDisplayName((res as StoreInterface).displayName)
                setApprovePage(true)
            }
        })
        return () => {}
    }, [])


    // ฟังชันก์เมื่อมีการกดเพื่อดูระยะทางในแผนที่แต่ละร้านบอร์ดเกม
    const clickEntrieMap = (source:string,destination:string,flon:number,flat:number,tlon:number,tlat:number,distance:number) => {
        const information = {
            source,
            destination,
            flon:flon,
            flat:flat,
            tlon:tlon,
            tlat:tlat,
            distance:distance
        }
        setEntrieShop(information)
        setStatusPageMap(2)
    }

    if (approvePage) {
        if (statusPageMap === 1) {
            return (
                <main className='max-w-[1400px] mx-auto mt-4 p-5'>
                    <div className='text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-8'>ร้านบอร์ดเกมใกล้เคียง</div>
                    {/* ทำการ sort ข้อมูลตามระยะทางที่สั้นที่สุด */}
                    {entrieShops.sort((a,b) => a.distance - b.distance).map((e,i) => <DisplayEntrieMaps key={i} {...e} clickEntrieMap={clickEntrieMap}/>)}
                    <div className='mt-10'>
                        <button 
                            className="text-white bg-redrose hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-3 py-2 text-center transition-colors duration-200 ease-in"
                            onClick={() => {
                                setStatusPageMap(0)
                                setEntrieShops([])
                            }}>ย้อนกลับ
                        </button>
                    </div>
                </main>
            )
        }else if (statusPageMap === 2 && entrieShop) {
            return <DisplayEntrieMap {...entrieShop} setStatusPageMap={setStatusPageMap}/>
        }else{
            return <SearchMap setEntrieShops={setEntrieShops} setStatusPageMap={setStatusPageMap} />
        }
    }else {
        return <div className="border border-black fixed top-0 left-0 right-0 bottom-0 bg-white"></div>
    }
}

export default MapAfter

