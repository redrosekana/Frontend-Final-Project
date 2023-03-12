// import library
import { NavLink, useNavigate, NavigateFunction } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

// import component
import Footer from "../footer"

// import api
import PopularBoardgameApi from '../../api/popularBoardgameApi'

// declare interface
interface ListBoardGameItem {
    name:string
    picture:string
    year:string
    id:string
}

// declare variable from .env
const web_boardgame = import.meta.env.VITE_WEBBORADGAME

function HomeBefore() {
    // ไว้เก็บข้อมูลแสดงบอร์ดเกมยอดนิยม
    const [popularBoardGame,setPopularBoardGame] = useState<ListBoardGameItem[]>([])

    const navigate:NavigateFunction = useNavigate()
    const cookie = new Cookies()
    const accessToken = cookie.get("accessToken")
    const refreshToken = cookie.get("refreshToken")
    
    // หลังจาก render ก็ดึงข้อมูลบอร์ดเกมยอดนิยมมาแสดงผล
    useEffect(() => {
        if (accessToken && refreshToken) {
            navigate("/page/home")
        }else {
            PopularBoardgameApi().then((res) => {
                if (!(typeof res === "string") && !(typeof res === "undefined")) {
                    setPopularBoardGame(res)
                }
            })
        }
    },[])

    return (
        <main>
            <div className='mt-16 mb-4 max-w-[1400px] mx-auto px-5'>
                <div className='flex flex-col specific:flex-row'>
                    <div className='flex flex-col justify-center order-2 text-center mt-8 w-full specific:w-[55%] specific:order-1 specific:mt-0 specific:text-start'>
                        <h3 className='font-bold text-2xl telephone:text-4xl lg:text-5xl'>Board Game RecCommu</h3>
                        <p className='mt-6 text-xl text-slate-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque esse ab ipsam blanditiis quaerat odit exercitationem necessitatibus totam rem omnis tempore vitae quos odio, deserunt tempora sunt enim quo! Quibusdam?</p>
                        <div className='mt-6 flex flex-col telephone:block'>
                            <button className='bg-orangey p-2 font-medium text-xl rounded-md text-white hover:bg-orange-500 transition-colors duration-150 ease-in'>
                                <NavLink to="/recommend">ระบบแนะนำบอร์ดเกม</NavLink>
                            </button>
                            <button className='p-2 font-medium text-xl border-2 border-gray-800 rounded-md ml-0 mt-3 telephone:ml-4 telephone:mt-0 hover:bg-slate-100 transition-colors duration-150 ease-in'>
                                <NavLink to="/party">ระบบค้นหาผู้เล่น</NavLink> 
                            </button>
                        </div>
                    </div>

                    <div className='flex justify-center order-1 w-full specific:justify-end specific:w-[45%] specific:order-2'>
                        <img src="/picture1.jpg" alt="picture1" className='max-w-[450px] w-full rounded-3xl specific:max-w-[550px] shakeAnimation' />
                    </div>
                </div>

                <div className='mt-36 lg:mt-[245px]'>
                    <h3 className='font-bold text-3xl telephone:text-4xl mb-12'>บอร์ดเกมยอดนิยม</h3>
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

export default HomeBefore
