//* import library
import { useEffect } from "react"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"

//* import api
import GetMemberApi from "../../api/getMemberApi"

//* import controller
import { createSwal } from "../../controller/createSwal"

//* import picture
import picture1 from "../../assets/picture1.jpg"

const amountItem:number[] = []
for (let i=1;i<=10;i++){
    amountItem.push(i)
}

function HomeAfter() {
  const cookie = new Cookies();
  const navigate = useNavigate();

  const accessToken: string = cookie.get("accessToken")
  const refreshToken:string = cookie.get("refreshToken")

  useEffect(() => {
    GetMemberApi(accessToken,"/user").then((res) => {
      console.log(res)
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
          console.log(res)
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
      }
    });
  }, []);

  return (
    <main className='mt-12 mb-4 max-w-[1400px] mx-auto px-5'>
        <div className='flex flex-col specific:flex-row'>
            <div className='flex flex-col justify-center order-2 text-center mt-8 w-full specific:w-[55%] specific:order-1 specific:mt-0 specific:text-start'>
                <h3 className='font-bold text-2xl telephone:text-4xl lg:text-5xl'>Board Game RecCommu</h3>
                <p className='mt-4 text-xl text-slate-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque esse ab ipsam blanditiis quaerat odit exercitationem necessitatibus totam rem omnis tempore vitae quos odio, deserunt tempora sunt enim quo! Quibusdam?</p>
                <div className='mt-4 flex flex-col telephone:block'>
                    <button className='bg-orangey p-2 font-medium text-xl rounded-md text-white hover:bg-orange-500'>ระบบแนะนำบอร์ดเกม</button>
                    <button className='border-2 border-black p-2 font-medium text-xl rounded-md ml-0 mt-3 telephone:ml-4 telephone:mt-0'>ระบบค้นหาผู้เล่น</button>
                </div>
            </div>

            <div className='flex justify-center order-1 w-full specific:justify-end specific:w-[45%] specific:order-2'>
                <img src={picture1} alt="picture1" className='max-w-[450px] w-full rounded-3xl specific:max-w-[550px] shakeAnimation' />
            </div>
        </div>

        <div className='mt-20'>
            <h3 className='font-bold text-2xl telephone:text-4xl'>บอร์ดเกมยอดนิยม</h3>
            <div>
                {amountItem.map((e,i) => {
                    return <ItemPopular key={i} detail={e}/>
                })}
            </div>
        </div>
    </main>
  )
}

interface ItemPopular {
  detail:number
}

const ItemPopular = ({detail}:ItemPopular) => {
  return (
      <div className="flex flex-col sm:flex-row items-center border-b-2 border-b-gray-300 my-8 pb-4">
          <div>
              <img src={picture1} alt="picture1" className='w-[320px] sm:w-[220px] rounded-md' />
          </div>
          <div className='flex-grow ml-8 mt-8 sm:mt-0'>
              <h4 className='text-2xl font-semibold'>Board Game {detail}</h4>
              <p className='text-lg text-gray-400'>2022</p>
              <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
          </div>
      </div>
  )
}

export default HomeAfter
