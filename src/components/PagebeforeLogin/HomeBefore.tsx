// import library
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

// import component
import Footer from "../footer"

// import api
import PopularBoardgameApi from '../../api/popularBoardgameApi'

// declare interface
interface ListBoardGameItem {
    name:string
    picture:string
    year:string
}

function HomeBefore() {
    const [popularBoardGame,setPopularBoardGame] = useState<ListBoardGameItem[]>([])

    // หลังจาก render ก็ดึงข้อมูลบอร์ดเกมยอดนิยมมาแสดงผล
    useEffect(() => {
        PopularBoardgameApi().then((res) => {
            if (!(typeof res === "string") && !(typeof res === "undefined")) {
                setPopularBoardGame(res)
            }
        })
    },[])

    return (
        <main>
            <div className='mt-12 mb-4 max-w-[1400px] mx-auto px-5'>
                <div className='flex flex-col specific:flex-row'>
                    <div className='flex flex-col justify-center order-2 text-center mt-8 w-full specific:w-[55%] specific:order-1 specific:mt-0 specific:text-start'>
                        <h3 className='font-bold text-2xl telephone:text-4xl lg:text-5xl'>Board Game RecCommu</h3>
                        <p className='mt-4 text-xl text-slate-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque esse ab ipsam blanditiis quaerat odit exercitationem necessitatibus totam rem omnis tempore vitae quos odio, deserunt tempora sunt enim quo! Quibusdam?</p>
                        <div className='mt-4 flex flex-col telephone:block'>
                            <button className='bg-orangey p-2 font-medium text-xl rounded-md text-white hover:bg-orange-500 transition-colors duration-150 ease-in'>
                                <NavLink to="/recommend">ระบบแนะนำบอร์ดเกม</NavLink>
                            </button>
                            <button className='border-2 border-black p-2 font-medium text-xl rounded-md ml-0 mt-3 telephone:ml-4 telephone:mt-0 hover:bg-slate-100 transition-colors duration-150 ease-in'>
                                <NavLink to="/party">ระบบค้นหาผู้เล่น</NavLink> 
                            </button>
                        </div>
                    </div>

                    <div className='flex justify-center order-1 w-full specific:justify-end specific:w-[45%] specific:order-2'>
                        <img src="/picture1.jpg" alt="picture1" className='max-w-[450px] w-full rounded-3xl specific:max-w-[550px] shakeAnimation' />
                    </div>
                </div>

                <div className='mt-24'>
                    <h3 className='font-bold text-2xl telephone:text-4xl mb-10'>บอร์ดเกมยอดนิยม</h3>
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
                {index === 0 || index === 1 || index === 2 ? <div className='sm:ml-4 w-[65px] h-[25px] inline-block rounded-full bg-orange-500 shadow shadow-orange-800 text-white mb-4 text-center flashingAnimation'>มาแรง {index+1}</div> : null }
                <h4 className='sm:ml-4 text-2xl font-semibold'>
                    {index+1}. {name}
                </h4>
                <p className='sm:ml-4 text-lg text-gray-400'>{year}</p>
                <p className='sm:ml-4 text-lg mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                
            </div>
        </div>
    )
}

export default HomeBefore
