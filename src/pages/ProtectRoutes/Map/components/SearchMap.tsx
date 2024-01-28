import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";

// utils
import { createSwal } from "../../../../utils/createSwal";
import { CalculateDistanceApi } from "../../../../utils/calculateDistanceApi";
import { VITE_BASE } from "../../../../utils/getEnv";

// component
import SuggestItem from "./SuggestItem";
import AnimationCarTranfer from "./AnimationCarTranfer";
import ItemAdvice from "../../../../components/ItemAdvice";

// global types
import { InformationEntrieShopOnlySearchItemPage } from "../types/SearchMapType";

// types
import { SearchMapProps } from "../types/SearchMapType";

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
    sourceAddress: "",
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
    tmpMap.zoom(14, true);

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
      window.scrollBy(0, 900);

      // แสดงข้อมูลที่อยู่ ณ ตำแหน่งนั้นให้ผู้ใช้งาน ในกรณีที่เป็นหมุด กับ เส้นทางสีน้ำเงิน
      if (ev.data.address) {
        setInformation({
          sourceAddress: ev.data.address,
          longitude: mouseLocation.lon,
          latitude: mouseLocation.lat,
        });
      } else if (ev.data.name_t) {
        setInformation({
          sourceAddress: ev.data.name_t,
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
  function doSuggest(value: string) {
    searchEl.current!.value = value;

    // คำสั่งในการค้นหา แล้วทำการแสดงหมุด ณ สถานที่นั้น
    map.Search.search(searchEl.current!.value, {
      limit: 7,
    });

    // รีเซ็ต search และ suggest
    searchEl.current!.value = "";
    setSuggestList([]);
  }

  // function that use to convert latitude and longtitude to meters
  function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371000; // Radius of the Earth in meters
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return distance;
  }

  // function that use convert degree to radian
  function toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }

  // ฟังชันก์คำนวณระยะทางร้านบอร์ดเกมกับระยะทางปัจจุบัน
  const calculateDistance = async () => {
    try {
      const result = await axios.get(`${VITE_BASE}/board_game_cafe.csv`);
      const text = Papa.parse(result.data);

      let boardGameShops = [];
      for (let i = 0; i < text.data.length; i++) {
        if (i === 0 || i === text.data.length - 1) continue;

        const target: any = {};
        const header = [...(text.data[0] as string)];

        for (let j = 0; j < header.length; j++) {
          target[header[j]] = (text.data[i] as any[])[j];
        }

        boardGameShops.push(target);
      }

      const { sourceAddress, longitude, latitude } = information;
      if (!sourceAddress || !longitude || !latitude) {
        createSwal(
          "แจ้งเตือน",
          `โปรดทำการเลือกที่อยู่ปัจจุบัน`,
          "warning",
          "#ec9e18"
        );
      } else {
        setReload(true);

        for (let i = 0; i < boardGameShops.length; i++) {
          Object.assign(boardGameShops[i], {
            distance: haversine(
              parseFloat(latitude),
              parseFloat(longitude),
              parseFloat(boardGameShops[i].lat),
              parseFloat(boardGameShops[i].lon)
            ),
          });
        }

        boardGameShops = boardGameShops
          .sort((a: any, b: any) => a.distance - b.distance)
          .filter((_, index: number) => index < 9);

        for (let i = 0; i < boardGameShops.length; i++) {
          const body: InformationEntrieShopOnlySearchItemPage = {
            sourceAddress: sourceAddress,
            destinationAddress: boardGameShops[i].name,
            sourceLatitude: parseFloat(latitude),
            sourceLongitude: parseFloat(longitude),
            destinationLatitude: parseFloat(boardGameShops[i].lat),
            destinationLongitude: parseFloat(boardGameShops[i].lon),
            destinationProvince: boardGameShops[i].province,
            destinationTel: boardGameShops[i].tel,
            destinationContact: boardGameShops[i].contact,
          };

          const result = await CalculateDistanceApi(body);
          setEntrieShops((prev: any) => {
            return [...prev, result];
          });
        }

        setReload(false);
        setStagePage("entriesMap");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <main className="mt-12 mb-4 max-w-[1400px] mx-auto px-4">
        <h3 className="text-center text-4xl md:text-5xl font-semibold">
          ค้นหาร้านบอร์ดเกมใกล้เคียง
        </h3>

        <div className="mt-4 mb-8">
          <p className="text-xl tl:text-2xl md:text-3xl lg:text-4xl">
            คำแนะนำการใช้งาน
          </p>
          <ul>
            <ItemAdvice content="ผู้ใช้งานสามารถเลือกสถานที่ปัจจุบันของผู้ใช้งานได้ หรือสถานที่ที่ผู้ใช้ต้องการทราบระยะทางจากร้านบอร์ดเกมที่ใกล้เคียงที่สุดโดยการ search ที่ช่องค้นหา" />
            <ItemAdvice content="เมื่อผู้ใช้งานได้ทำการเลือกสถานที่เสร็จเรียบร้อย ให้ทำการคลิ๊กที่หมุดในแผนที่ 1 ครั้ง จะมีข้อมูลสถานที่แสดงในกรอบ ที่อยู่ปัจจุบัน เพื่อเป็นการยืนยันว่าผู้ใช้เลือกสถานที่นี้" />
            <ItemAdvice content="เมื่อเช็คว่าเป็นสถานที่นี้แล้ว ก็ทำการกดที่ปุ่มคำนวณระยะทาง" />
            <ItemAdvice content="เมื่อทำการกดปุ่มแล้วจะมีรายการร้านบอร์ดเกมที่ใกล้เคียงแสดงขึ้นมาเพื่อให้ผู้ใช้ทราบสถานที่การเดินทาง พร้อมทั้งบอกระยะทางที่สั้นที่สุดในการเดินทาง" />
          </ul>
        </div>

        <h3 className="text-xl sm:text-2xl xl:text-4xl font-semibold text-center mt-12 text-gray-500">
          หากพร้อมแล้วไปกันเลยย :)
        </h3>
        <AnimationCarTranfer />

        <div className="text-2xl md:text-3xl mt-8">แผนที่</div>
        <div className="mt-4 flex flex-col sm:flex-row gap-x-4">
          <div className="max-w-4xl w-full rounded-2xl h-[400px] sm:h-[450px]">
            <div
              ref={mapEl}
              className="w-full h-full rounded-2xl overflow-hidden"
            ></div>
          </div>

          <div className="w-full sm:w-[550px] mt-6 sm:mt-0">
            <form className="relative" onSubmit={(ev) => searchSubmit(ev)}>
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
                className="w-full rounded-md p-4 pl-10 mb-1 text-md text-gray-700 outline-none bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-1"
              />
              <button
                type="submit"
                className="absolute bottom-4 right-3 bg-primary hover:bg-green-500 text-white rounded-md text-md py-1 px-3 transition ease-in duration-150"
              >
                ค้นหา
              </button>
            </form>

            <div className="p-2 mt-2">
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

        <div className="mt-8 max-w-lg w-full mx-auto">
          <label className="font-medium text-xl">ที่อยู่ปัจจุบัน</label>
          <textarea
            className="text-center max-w-[700px] w-full h-[120px] resize-none rounded-md mt-4 text-lg text-gray-700 border bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-1"
            disabled
            defaultValue={information.sourceAddress}
          />
          <div className="text-end mt-3">
            <button
              onClick={() => calculateDistance()}
              className="mt-2 p-2 bg-primary hover:bg-green-500 text-white rounded-md text-md transition ease-in duration-150"
            >
              คำนวณระยะทาง
            </button>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default SearchMap;
