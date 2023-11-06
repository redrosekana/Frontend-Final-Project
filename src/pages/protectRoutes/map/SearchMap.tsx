// import library
import { useState, useRef, useEffect } from "react";

// utils
import { createSwal } from "../../../utils/createSwal";

// component
import SuggestItem from "./SuggestItem";
import AnimationCarTranfer from "./AnimationCarTranfer";
import ItemAdvice from "../../../components/ItemAdvice";
import { CalculateDistanceApi } from "../../../utils/calculateDistanceApi";

// constants
import { BoardgameShops } from "../../../constants/BoardgameShop";

// interface
import { InformationEntrieShop } from "../../../interfaces/informationEntrieShop.interface";

type StagePage = "searchMap" | "entriesMap" | "displayDetailMap";

// declare interface for SearchMap
interface SearchMapProps {
  setEntrieShops: React.Dispatch<React.SetStateAction<InformationEntrieShop[]>>;
  setStagePage: React.Dispatch<React.SetStateAction<StagePage>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

// ตัวแปรเก็บ map
let map: any = "";
function SearchMap({
  setEntrieShops,
  setStagePage,
  setReload,
}: SearchMapProps) {
  const mapEl = useRef<HTMLDivElement>(null);
  const searchEl = useRef<HTMLInputElement>(null);

  // ผลลัพธ์ที่เป็นไปได้ทั้งหมด
  const resultEl = useRef<HTMLDivElement>(null);

  // ไว้เก็บรายการ suggest , lon , lat
  const [suggestList, setSuggestList] = useState<{ w: string }[]>([]);

  const [information, setInformation] = useState({
    address: "",
    longitude: "",
    latitude: "",
  });

  useEffect(() => {
    init();
    return () => {};
  }, []);

  // ฟังชันก์ในการสร้างแผนที่
  const init = () => {
    const tmpMap = new window.longdo.Map({
      placeholder: mapEl.current, // อ้างถึง element ที่จะแสดงภาพแผนที่
      language: "th", // เปลี่ยนภาษาที่จะแสดงในแผนที่ (en/th)
      lastView: true, // แสดงแผนที่ในตำแหน่งสุดท้ายที่ผู้ใช้งานเปิด (true/false)
    });

    // กำหนดการ zoom เริ่มต้นตอนสร้างแผนที่ ค่า defalut 1-20
    tmpMap.zoom(15, true);

    // ตั้งค่าให้โหมดของแผนที่ไม่แสดงผล
    tmpMap.Ui.LayerSelector.visible(false);

    // กำหนดค่าเริ่มตอนสร้างแผนที่
    tmpMap.location({ lon: 100.539051, lat: 13.829052 });

    // ตั้งค่าให้แสดงค่าผลลัพธ์สถานที่ที่เป็นไปได้ตอนทำการกดปุ่มค้นหา หรือ เลือกจากที่แนะนำ
    tmpMap.Search.placeholder(resultEl.current);

    // ตั้งค่าเพื่อให้เกิด event เมื่อพิมพ์ในกล่อง search แล้วจะขึ้นแนะนำสถานที่นั่นเอง ทำงานร่วมกับในบรรทัดที่ 146
    tmpMap.Event.bind("suggest", function (ev: any) {
      // เช็คว่าถ้าคำไม่ตรงกับในช่อง search ให้ return ออกไป
      if (ev.meta.keyword !== searchEl.current!.value) return;

      // เซ็ตค่าที่แนะนำที่ไปให้แสดงผล
      setSuggestList(ev.data);
    });

    // event เมื่อ click ที่หมุด
    tmpMap.Event.bind("overlayClick", function (ev: any) {
      // method ที่หาค่าลองติจูดและละติจูดตอนทำการคลิ๊กที่หมุดได้
      let mouseLocation = map.location(window.longdo.LocationMode.Pointer);

      // แสดงข้อมูลที่อยู่ ณ ตำแหน่งนั้นให้ผู้ใช้งาน ในกรณีที่เป็นหมุด กับ เส้นทางสีน้ำเงิน
      if (ev.data.address) {
        setInformation({
          address: ev.data.address,
          longitude: mouseLocation.lon,
          latitude: mouseLocation.lat,
        });
      } else if (ev.data.name_t) {
        setInformation({
          address: ev.data.name_t,
          longitude: mouseLocation.lon,
          latitude: mouseLocation.lat,
        });
      }
    });

    // เก็บค่าตัวแปรแผนที่เอาไว้ เพื่อใช้กับ method อื่นๆ
    map = tmpMap;
  };

  // ฟังชันก์เมื่อกดปุ่ม ค้นหา
  const searchSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    // คำสั่งในการค้นหา แล้วทำการแสดงหมุด ณ สถานที่นั้น
    map.Search.search(searchEl.current!.value, {
      limit: 7,
    });

    // รีเซ็ต search และ suggest
    searchEl.current!.value = "";
    setSuggestList([]);
  };

  // ฟังชันก์เมื่อพิมพ์ใน input tag ถ้าเกิน 3 ตัวก็เข้า event แสดง suggest
  const suggestInput = (): void => {
    // เมื่อมีการพิมพ์ให้ปิดการแสดงสถานที่ที่เป็นไปได้ออกไป
    resultEl.current!.innerHTML = "";

    // ถ้าพิมพ์ไม่เกิน 3 ตัวอักษรจะไม่มีการแนะนำ
    if (searchEl.current!.value.length < 3) {
      setSuggestList([]);
      return;
    }

    // เมื่อเรียกคำสั่งนี้จะเกิด event ในบรรทัดที่ 41 ซึ่งจะแสดงสถานที่แนะนำขึ้นมา
    map.Search.suggest(searchEl.current!.value);
  };

  // ฟังชันก์เมื่อกดคำในช่องคำแนะนำ
  function doSuggest(value: any) {
    searchEl.current!.value = value;

    // คำสั่งในการค้นหา แล้วทำการแสดงหมุด ณ สถานที่นั้น
    map.Search.search(searchEl.current!.value, {
      limit: 7,
    });

    // รีเซ็ต search และ suggest
    searchEl.current!.value = "";
    setSuggestList([]);
  }

  // ฟังชันก์คำนวณระยะทางร้านบอร์ดเกมกับระยะทางปัจจุบัน
  const calculateDistance = async () => {
    const { address, longitude, latitude } = information;

    if (!address || !longitude || !latitude) {
      createSwal(
        "แจ้งเตือน",
        `โปรดทำการเลือกที่อยู่ปัจจุบัน`,
        "warning",
        "#ec9e18"
      ).then(() => {
        return;
      });
    }

    setReload(true);
    for (let i = 0; i < BoardgameShops.length; i++) {
      const result = await CalculateDistanceApi(
        address,
        BoardgameShops[i].name,
        parseFloat(longitude),
        parseFloat(latitude),
        BoardgameShops[i].lon,
        BoardgameShops[i].lat
      );
      setEntrieShops((prev: any) => {
        return [...prev, result];
      });
    }

    setReload(false);
    setStagePage("entriesMap");
  };

  return (
    <>
      <main className="max-w-[1400px] mx-auto mt-8 p-5">
        <div>
          <h3 className="text-xl sm:text-3xl xl:text-5xl font-bold text-center">
            ค้นหาร้านบอร์ดเกมใกล้เคียง
          </h3>
          <div className="mt-4 ml-4">
            <p className="text-lg sm:text-xl lg:text-2xl">คำแนะนำการใช้งาน</p>
            <ul>
              <ItemAdvice content="ผู้ใช้งานสามารถเลือกสถานที่ปัจจุบันของผู้ใช้งานได้ หรือสถานที่ที่ผู้ใช้ต้องการทราบระยะทางจากร้านบอร์ดเกมที่ใกล้เคียงที่สุดโดยการ search ที่ช่องค้นหา" />
              <ItemAdvice content="เมื่อผู้ใช้งานได้ทำการเลือกสถานที่เสร็จเรียบร้อย ให้ทำการคลิ๊กที่หมุดในแผนที่ 1 ครั้ง จะมีข้อมูลสถานที่แสดงในกรอบ ที่อยู่ปัจจุบัน เพื่อเป็นการยืนยันว่าผู้ใช้เลือกสถานที่นี้" />
              <ItemAdvice content="เมื่อเช็คว่าเป็นสถานที่นี้แล้ว ก็ทำการกดที่ปุ่มคำนวณระยะทาง" />
              <ItemAdvice content="เมื่อทำการกดปุ่มแล้วจะมีรายการร้านบอร์ดเกมที่ใกล้เคียงแสดงขึ้นมาเพื่อให้ผู้ใช้ทราบสถานที่การเดินทาง พร้อมทั้งบอกระยะทางที่สั้นที่สุดในการเดินทาง" />
            </ul>
          </div>
        </div>

        <h3 className="text-lg sm:text-2xl xl:text-4xl font-semibold text-center mt-12 text-gray-500">
          หากพร้อมแล้วไปกันเลยย :)
        </h3>
        <AnimationCarTranfer />
      </main>

      <main className="max-w-[1400px] mx-auto mt-5 p-5 mb-5">
        <div className="text-xl md:text-3xl">แผนที่</div>
        <div className="mt-4 flex flex-col justify-center sm:flex-row sm:justify-start">
          <div className="max-w-4xl w-full">
            <div
              ref={mapEl}
              className="w-full h-[400px] sm:h-[450px] rounded-2xl overflow-hidden"
            ></div>
          </div>

          <div className="self-center sm:self-start w-full sm:w-[550px]">
            <form
              className="relative mx-2 mt-4 sm:mt-0"
              onSubmit={(ev) => searchSubmit(ev)}
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="ค้นหาสถานที่"
                ref={searchEl}
                onInput={suggestInput}
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-limegreen hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200 ease-in"
              >
                ค้นหา
              </button>
            </form>

            <div className="p-2 ml-2 mt-2">
              {suggestList.map((element, index: number) => {
                return (
                  <SuggestItem
                    key={index}
                    address={element.w}
                    doSuggest={doSuggest}
                  />
                );
              })}
            </div>

            <div ref={resultEl} className="p-2"></div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="max-w-lg w-full">
            <label className="font-medium text-xl">ที่อยู่ปัจจุบัน</label>
            <div className="flex items-center justify-center text-center mt-2 border border-gray-500 h-[150px] text-lg rounded bg-slate-50">
              {information.address}
            </div>
            <div className="text-end mt-3">
              <button
                onClick={() => calculateDistance()}
                className="text-white bg-limegreen hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium rounded-md text-base px-4 py-2 transition-colors duration-200 ease-in"
              >
                คำนวณระยะทาง
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SearchMap;
