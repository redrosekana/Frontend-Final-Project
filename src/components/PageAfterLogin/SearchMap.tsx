// import library
import { useState , useRef , useEffect } from "react"

// import controller
import { createSwal } from "../../controller/createSwal"

// import api
import CalculateDistance from "../../api/calculateDistanceApi"

// declare interface for SearchMap
interface SearchMapProps {
	setEntrieShops:React.Dispatch<React.SetStateAction<InformationEntrieShops[]>>
	setStatusPageMap:React.Dispatch<React.SetStateAction<number>>
}

// ประกาศ interface แสดงข้อมูลสำหรับการ suggest
interface DataSuggest {
	w:string,
}

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

// ร้านค้าแบบชั่วคราว
const shopTmp = [
	{nameShop:"โรงเรียนประชานิเวศน์",lon:100.546725 , lat:13.843971},
	{nameShop:"มหาวิทยาลัยเกษตรศาสตร์",lon:100.566246 , lat:13.845630},
	{nameShop:"โรงเรียนหอวัง",lon:100.560721 , lat:13.818849},
]

// ตัวแปรเก็บ map
let map:any = ""
function SearchMap({ setEntrieShops , setStatusPageMap }:SearchMapProps) {

	const mapEl = useRef<HTMLDivElement>(null)
	const searchEl = useRef<HTMLInputElement>(null)
	const resultEl = useRef<HTMLDivElement>(null)
	const displayAddress = useRef<HTMLDivElement>(null)

	// ไว้เก็บรายการ suggest , lon , lat
	const [listSuggest,setListSuggest] = useState<DataSuggest[]>([])
	const [source,setSource] = useState<string | null>(null)
	const [longitude,setLongitude] = useState<number | null>(null)
	const [latitude,setLatitude] = useState<number | null>(null)

	useEffect(() => {
		init()
		return () => {}
  },[])

	// ฟังชันก์ในการสร้างแผนที่
	const init = () => {
		const tmpMap = new window.longdo.Map({
			placeholder: mapEl.current, // อ้างถึง element ที่จะแสดงภาพแผนที่
			language:"th", // เปลี่ยนภาษาที่จะแสดงในแผนที่ (en/th)
			lastView:true,  // แสดงแผนที่ในตำแหน่งสุดท้ายที่ผู้ใช้งานเปิด (true/false)
		})

		// กำหนดการ zoom เริ่มต้นตอนสร้างแผนที่ ค่า defalut 1-20
		tmpMap.zoom(15,true)

		// ตั้งค่าให้โหมดของแผนที่ไม่แสดงผล
		tmpMap.Ui.LayerSelector.visible(false);

		// กำหนดค่าเริ่มตอนสร้างแผนที่
		tmpMap.location({lon:100.539051 , lat:13.829052})

		// ตั้งค่าให้แสดงค่าผลลัพธ์สถานที่ที่เป็นไปได้ตอนทำการกดปุ่มค้นหา หรือ เลือกจากที่แนะนำ
		tmpMap.Search.placeholder(resultEl.current)

		// ตั้งค่าเพื่อให้เกิด event เมื่อพิมพ์ในกล่อง search แล้วจะขึ้นแนะนำสถานที่นั่นเอง ทำงานร่วมกับในบรรทัดที่ 94
		tmpMap.Event.bind("suggest", function(ev:any) {
				// เช็คว่าถ้าคำไม่ตรงกับในช่อง search ให้ return ออกไป
			if (ev.meta.keyword !== searchEl.current!.value){
				return
			}
			
			// เซ็ตค่าที่แนะนำที่ไปให้แสดงผล
			setListSuggest(ev.data)
		})

		// event เมื่อ click ที่หมุด
		tmpMap.Event.bind('overlayClick', function(ev:any) {
			
			// method ที่หาค่าลองติจูดและละติจูดตอนทำการคลิ๊กที่หมุดได้
			let mouseLocation = map.location(window.longdo.LocationMode.Pointer)
			
				// เก็บค่า lon , lat ด้วยการ setState
				setLongitude(mouseLocation.lon)
				setLatitude(mouseLocation.lat)
				
				// แสดงข้อมูลที่อยู่ ณ ตำแหน่งนั้นให้ผู้ใช้งาน ในกรณีที่เป็นหมุด กับ เส้นทางสีน้ำเงิน
				if (ev.data.address) {
					displayAddress.current!.innerText = ev.data.address
					setSource(ev.data.address)
				}else if (ev.data.name_t) {
					displayAddress.current!.innerText = ev.data.name_t
					setSource(ev.data.name_t)
				}
		})

		// เก็บค่าตัวแปรแผนที่เอาไว้ เพื่อใช้กับ method อื่นๆ
		map = tmpMap
	}

	// ฟังชันก์เมื่อกดปุ่ม ค้นหา
	const searchPlace = (ev:React.FormEvent):void => {
		ev.preventDefault()

		// คำสั่งในการค้นหา แล้วทำการแสดงหมุด ณ สถานที่นั้น
		map.Search.search(searchEl.current!.value,{
			limit:7
		})

		// รีเซ็ต search และ suggest
		searchEl.current!.value = ""
		setListSuggest([])
	}

	// ฟังชันก์เมื่อพิมพ์ใน input tag ถ้าเกิน 3 ตัวก็เข้า event แสดง suggest
	const suggestInput = ():void => {
		// เมื่อมีการพิมพ์ให้ปิดการแสดงสถานที่ที่เป็นไปได้ออกไป
		resultEl.current!.innerHTML = ""
		
		// ถ้าพิมพ์ไม่เกิน 3 ตัวอักษรจะไม่มีการแนะนำ
		if (searchEl.current!.value.length < 3) {
			setListSuggest([])
			return
		}

		// เมื่อเรียกคำสั่งนี้จะเกิด event ในบรรทัดที่ 41 ซึ่งจะแสดงสถานที่แนะนำขึ้นมา
		map.Search.suggest(searchEl.current!.value)
	}

	// ฟังชันก์เมื่อกดคำในช่องคำแนะนำ
	function doSuggest(value:any) {
		searchEl.current!.value = value;

		// คำสั่งในการค้นหา แล้วทำการแสดงหมุด ณ สถานที่นั้น
		map.Search.search(searchEl.current!.value,{
			limit:7
		})

		// รีเซ็ต search และ suggest
		searchEl.current!.value = ""
		setListSuggest([])
	}
  

	// ฟังชันก์คำนวณระยะทางร้านบอร์ดเกมกับระยะทางปัจจุบัน
	const calculateDistance = async (longitude: number | null , latitude:number | null , source:string | null) => {
		if (!longitude || ! latitude || !source) {
				createSwal("แจ้งเตือน", `โปรดทำการเลือกที่อยู่ปัจจุบัน`, "warning", "#ec9e18").then(() => {
					return
				})
		}else {
			for (let i=0;i<shopTmp.length;i++) {
				const information:InformationEntrieShops | undefined | string = await CalculateDistance(source , shopTmp[i].nameShop , longitude , latitude , shopTmp[i].lon , shopTmp[i].lat)
				
				if (!information){
					return
				}else if (information === "มีข้อผิดพลาดของเซิฟเวอร์" || information === "มีข้อผิดพลาดของบราวเซอร์") {
					return
				}else  {
					setEntrieShops(prev => [...prev,information as InformationEntrieShops])
				}
			}
			setStatusPageMap(1)
		}
	}
	
	return (
		<>
			<main className='max-w-[1400px] mx-auto mt-8 p-5'>
				<div className=''>
					<h3 className='text-xl sm:text-3xl xl:text-5xl font-bold text-center'>ค้นหาร้านบอร์ดเกมใกล้เคียง</h3>
					<div className='mt-4 ml-4'>
							<p className='text-lg sm:text-xl lg:text-2xl'>คำแนะนำการใช้งาน</p>
							<ul>
								<ItemContentSuggestWebsite content='ผู้ใช้งานสามารถเลือกสถานที่ปัจจุบันของผู้ใช้งานได้ หรือสถานที่ที่ผู้ใช้ต้องการทราบระยะทางจากร้านบอร์ดเกมที่ใกล้เคียงที่สุดโดยการ search ที่ช่องค้นหา'/>
								<ItemContentSuggestWebsite content='เมื่อผู้ใช้งานได้ทำการเลือกสถานที่เสร็จเรียบร้อย ให้ทำการคลิ๊กที่หมุดในแผนที่ 1 ครั้ง จะมีข้อมูลสถานที่แสดงในกรอบ ที่อยู่ปัจจุบัน เพื่อเป็นการยืนยันว่าผู้ใช้เลือกสถานที่นี้'/>
								<ItemContentSuggestWebsite content='เมื่อเช็คว่าเป็นสถานที่นี้แล้ว ก็ทำการกดที่ปุ่มคำนวณระยะทาง'/>
								<ItemContentSuggestWebsite content='เมื่อทำการกดปุ่มแล้วจะมีรายการร้านบอร์ดเกมที่ใกล้เคียงแสดงขึ้นมาเพื่อให้ผู้ใช้ทราบสถานที่การเดินทาง พร้อมทั้งบอกระยะทางที่สั้นที่สุดในการเดินทาง'/>
							</ul>
					</div>
				</div>

				<h3 className='text-lg sm:text-2xl xl:text-4xl font-semibold text-center mt-12 text-gray-500'>หากพร้อมแล้วไปกันเลยย :)</h3>
				<div className='container-wrapper mt-8'>
					<div className="loop-wrapper">
							<div className="mountain"></div>
							<div className="hill"></div>
							<div className="tree"></div>
							<div className="tree"></div>
							<div className="tree"></div>
							<div className="rock"></div>
							<div className="truck"></div>
							<div className="wheels"></div>
					</div> 
				</div>
			</main>

			<main className='max-w-[1400px] mx-auto mt-5 p-5 mb-5'>
				<div className='text-xl md:text-3xl'>แผนที่</div>
				<div className='mt-4 flex flex-col justify-center sm:flex-row sm:justify-start'>
					<div className='flex-shrink-0 sm:w-[56%] lg:w-[65%] xl:w-[70%]'>
							<div ref={mapEl} className="h-[400px] sm:h-[450px] rounded-2xl overflow-hidden"></div>
					</div>

					<div className='self-center sm:self-start w-full'>
							<form className='relative mx-2 mt-4 sm:mt-0' onSubmit={(ev) => searchPlace(ev)}>   
								<div className="absolute inset-y-0 left-0 flex items-center pl-3">
									<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
								</div>
								<input 
									type="text" 
									placeholder="ค้นหาสถานที่"id="default-search" 
									ref={searchEl} 
									onInput={suggestInput} 
									className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
								/>
								<button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-limegreen hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200 ease-in">ค้นหา</button>
							</form>
							
							<div className='p-2'>
								{listSuggest!.map((e,i) => {
									return <LiSuggestItem key={i} detail={e.w} doSuggest={doSuggest}/>
								})}
							</div>

							<div ref={resultEl} className="p-2"></div>
					</div>
				</div>

				<div className='mt-8 flex justify-center'>
					<div className='max-w-lg w-full'>
							<label className='font-medium text-xl'>ที่อยู่ปัจจุบัน</label>
							<div className="flex items-center justify-center text-center mt-2 border border-gray-700 h-[150px] text-lg rounded" ref={displayAddress}></div>
							<div className='text-end mt-3'>
								<button onClick={() => calculateDistance(longitude , latitude , source)}
									className="text-white bg-limegreen hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium rounded-md text-base px-4 py-2 transition-colors duration-200 ease-in">
									คำนวณระยะทาง
								</button>
							</div>
					</div>
				</div>
			</main>
		</>
	)
}

// declare interface for ItemContentSuggestWebsite
interface ItemContentSuggestWebsiteProps {
	content:string
}

const ItemContentSuggestWebsite = ({ content }:ItemContentSuggestWebsiteProps) => {
	return <li className='mt-2 sm:text-lg lg:text-xl'>- {content}</li>
}

// declare interface for LiSuggestItem
interface LiSuggestItemProps {
	detail:string
	doSuggest:(detail:string) => void
}

const LiSuggestItem = ({detail , doSuggest}:LiSuggestItemProps) => {
	return (
		 <div onClick={() => doSuggest(detail)} className="hover:bg-slate-100 cursor-pointer border border-gray-400 rounded py-1 pl-2 mt-1 text-start">
			  <span>{detail}</span>
		 </div>
	)
}

export default SearchMap
