// import library
import { NavLink } from 'react-router-dom'

// import component
import Footer from "../footer"

const amountItem:number[] = []
for (let i=1;i<=10;i++){
    amountItem.push(i)
}

function HomeBefore() {
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
                    <h3 className='font-bold text-2xl telephone:text-4xl'>บอร์ดเกมยอดนิยม</h3>
                    {amountItem.map((e,i) => {
                        return <ItemPopular key={i} detail={e} index={i}/>
                    })}
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
        <div className="flex flex-col sm:flex-row items-center my-8 pb-4 border-b-2 border-b-gray-300">
            <div>{pictureTmp}</div>
            <div className='mt-4 sm:mt-0 sm:ml-4 sm:flex-grow'>
                <h4 className='ml-2 sm:ml-0 text-2xl font-semibold'>Board Game {detail}</h4>
                <p className='ml-2 sm:ml-0 text-lg text-gray-400'>2022</p>
                <p className='ml-2 sm:ml-0 text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            </div>
        </div>
    )
}

export default HomeBefore
