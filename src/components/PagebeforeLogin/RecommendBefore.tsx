// import library
import { useEffect, useState } from "react"

// import api
import InformationBoardGameApi from "../../api/informationBoardGameApi"
import RecommendGuestApi from "../../api/recommendGuestApi"

// import controller
import { createSwal } from "../../controller/createSwal"

// import components
import Reload from "../reload"

interface successResponse {
    currentData:RecommendEntries,
    recommend:RecommendEntries[]
}

// declare interface for ListBoardGameRecommend
interface RecommendEntries {
    id:string
    name:string
    minplayers:number
    maxplayers:number
    minage:number
    playingtime:number
    yearpublished:number
    description:string
    image:string
}

function RecommendBefore() {
    // ไว้เก็บข้อมูลบอร์ดเกมทั้งหมด เพื่อใช้ทำ search engine
    const [information,setInformation] = useState<string[]>([])
    // ไว้เก็บข้อมูลรายการบอร์ดเกมที่จะแนะนำ
    const [currentData,setcurrentData] = useState<RecommendEntries | null>(null)
    const [recommend,setRecommend] = useState<RecommendEntries[]>([])
    // ตัวแปรผูกกับ text input element
    const [game, setGame] = useState<string>("")
    const [reload,setReload] = useState<boolean>(false)
    
    // หลังจาก render ครั้งแรก ทำการดึงข้อมูลบอร์ดเกมทั้งหมดมาเก็บไว้
    useEffect(() => {
        InformationBoardGameApi().then(res => {
            if (typeof res === "object") {
                setInformation(res)
            }else {
                createSwal("เกิดข้อผิดพลาด", "มีข้อผิดพลาดของเซิฟเวอร์", "error", "#e10000").then(() => {})
            }
        })
        
        return () => {}
    },[])
    
    // ฟังชันก์เอาไว้ใช้เป็น callback function ในการ filter ของ search engine
    const checkConditionInput = (e:string, i:number) => {
        if (!(game.search(/\\/ig) === -1)) return false
        
        if (game.includes(".") && i > 1000) return false
        
        if (!game) {
            return false
        }else {
            const checkMatchString = new RegExp(game,"ig")
            return checkMatchString.test(e)
        }
    }

    // เมื่อเลือกเกมที่ต้องการ แล้วกดปุ่มจะทำฟังชันก์นี้เพื่อค้นหาเกมมาแนะนำ
    const onSubmit = async (ev:React.FormEvent, game:string) => {
        ev.preventDefault()

        if (!game) {
            createSwal("แจ้งเตือน", "โปรดใส่ชื่อบอร์ดเกม", "warning", "#ec9e18").then(() => {})
        }

        if (information.includes(game)) {
            setGame("")
            setRecommend([])
            setcurrentData(null)
            
            setReload(true)
            const result = await RecommendGuestApi(game)
            setReload(false)

            if (result === "มีข้อผิดพลาดของเซิฟเวอร์" || result === "มีข้อผิดพลาดของบราวเซอร์") {
                createSwal("เกิดข้อผิดพลาด", result, "error", "#e10000").then(() => {})
            }else {
                setRecommend((result as successResponse).recommend)
                setcurrentData((result as successResponse).currentData)
            }
        }else {
            createSwal("แจ้งเตือน", "ไม่พบชื่อบอร์ดเกม", "warning", "#ec9e18")
        }
    }

    return (
        <>
            {reload ? <Reload/> : null}
            <main>
                <div className="px-5 mt-12 max-w-[1400px] mx-auto">
                    <h3 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold">Recommend Boardgame</h3>
                    <form className="flex items-center max-w-3xl w-full mx-auto mt-8" onSubmit={(ev) => onSubmit(ev,game)}>   
                        <div className="relative w-full h-12">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input value={game} onInput={(e) => setGame(e.currentTarget.value)}  type="text" className=" bg-gray-50 border border-gray-400 text-gray-700 text-sm rounded-lg focus:ring-1 focus:ring-blue-700 focus:border-blue-700 block w-full pl-10 p-2 h-full" placeholder="Search"/>
                        </div>
                        <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-limegreen rounded-lg border border-limegreen hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </form>

                    <div className={`flex flex-col gap-y-3 gap-x-4 max-w-3xl max-full mx-auto overflow-y-scroll max-h-[330px] mt-8 bg-white border border-gray-200 shadow-xl p-4 rounded-lg  ${game === "" ? "hidden" : "block"}`}>
                        {information.filter(checkConditionInput).length === 0 ? <span className="text-center">ไม่พบชื่อบอร์ดเกม</span> : 
                            information.filter(checkConditionInput).map((e,i) => {
                                return <span onClick={() => setGame(e)} key={i} className="border border-gray-200 cursor-pointer rounded-md shadow-md text-center bg-slate-50 p-4 h-10 flex justify-center items-center hover:bg-slate-100 active:bg-slate-200 transition duration-75 ease-in">{e}</span>
                            })
                        }
                    </div>

                    {
                        currentData ? 
                            <div className="mt-16">
                                <div className="font-semibold text-4xl">เกมที่คุณค้นหา</div>
                                <ListBoardGameRecommend {...currentData}/>
                            </div> 
                        : null
                    }

                    {
                        recommend.length !== 0 ? 
                            <div className="mt-16">
                                <div className="font-semibold text-4xl">เกมที่แนะนำ</div>
                                {recommend.map((e,i) => <ListBoardGameRecommend key={i} {...e} index={i}/> )}
                            </div> 
                        : null
                    }
                </div>
            </main>
        </>
    )
}

// declare interface for ListBoardGameRecommend
interface ListBoardGameRecommendProps extends RecommendEntries {index?:number}

const ListBoardGameRecommend = ({id, name, minplayers, maxplayers, minage, playingtime, yearpublished, description, image, index}:ListBoardGameRecommendProps) => {
    const strOptimize1 = description.substring(0,300).replace(/&.*;/ig," ")
    const lastIndex = strOptimize1.lastIndexOf(" ")
    const strOptimize2 = strOptimize1.substring(0,lastIndex)

    return (
        <div className="p-6 flex flex-col items-center md:flex-row md:items-start mb-4">
            <div className="max-w-[270px] w-full h-[250px] rounded-2xl md:self-center md:h-[300px]">
                <img src={image} alt="image" className="w-full h-full object-fill rounded-2xl md:h-full" />
            </div>

            <div className="max-w-[400px] w-full mt-6 md:mt-2 md:ml-8 md:max-w-max">
                <p className="font-semibold text-3xl">{index !== undefined ? index+1 + ")." : null} {name}</p>
                <p className="mt-1 font-normal text-xl text-gray-500">{yearpublished}</p>
                <p className="mt-4 text-xl"><span className="font-semibold">รายละเอียด</span> {strOptimize2} <a className="text-blue-700 underline ml-1" href={`https://boardgamegeek.com/boardgame/${id}`} target="_blank">อ่านต่อ</a></p>
                
                <div className=" flex justify-center md:justify-start mt-4 gap-x-4">
                    <div className="text-lg  flex flex-col items-center px-2">
                        <img src="/person.png" alt="person" className="max-w-[60px] w-full h-[60px] " />
                        <span className="text-center mt-1"> <span className="font-semibold">จำนวนผู้เล่น</span> {minplayers === maxplayers ? minplayers : `${minplayers}-${maxplayers}`} คน</span>
                    </div>
                    <div className="text-lg  flex flex-col items-center px-2">
                        <img src="/time.png" alt="time" className="max-w-[60px] w-full h-[60px] " />
                        <span className="text-center mt-1"><span className="font-semibold">เวลาในการเล่น</span> {playingtime} นาที</span>
                    </div>
                    <div className="text-lg  flex flex-col items-center px-2">
                        <img src="/age.png" alt="time" className="max-w-[60px] w-full h-[60px] " />
                        <span className="text-center mt-1"><span className="font-semibold">อายุ</span> {minage} <span className="font-semibold">ปีขึ้นไป</span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default RecommendBefore
