// import library
import { useRef, useEffect } from "react";

type StagePage = "searchMap" | "entriesMap" | "displayDetailMap";

interface InformationEntrieProps {
  distance: number;
  sourceAddress: string;
  destinationAddress: string;
  sourceLongitude: number;
  sourceLatitude: number;
  destinationLongitude: number;
  destinationLatitude: number;
  setStagePage: React.Dispatch<React.SetStateAction<StagePage>>;
}

// สร้างตัวแปรเก็บ map
let map: any = "";
export default function DisplayDetailMap(props: InformationEntrieProps) {
  // อ้างอิงไปยัง element ที่จะแสดงแผนที่
  const mapEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    init();
  }, []);

  // ฟังชันก์ที่สร้างแผนที่ขึ้นมา
  const init = () => {
    const tmpMap = new window.longdo.Map({
      placeholder: mapEl.current, // อ้างถึง element ที่จะแสดงภาพแผนที่
      language: "th", // เปลี่ยนภาษาที่จะแสดงในแผนที่ (en/th)
    });

    // ตั้งค่าให้โหมดของแผนที่ไม่แสดงผล
    tmpMap.Ui.LayerSelector.visible(false);

    // กำหนดค่าเริ่มตอนสร้างแผนที่
    tmpMap.location({ lon: props.sourceLongitude, lat: props.sourceLatitude });

    // กำหนดการ zoom เริ่มต้นตอนสร้างแผนที่ ค่า defalut 1-20
    tmpMap.zoom(13, true);

    // หมุดปลายทาง ถ้าหากมีหลายอันก็สร้างเพิ่มได้ แต่มีเพียงอันเดียว
    const markerDestination = new window.longdo.Marker(
      { lat: props.destinationLatitude, lon: props.destinationLongitude },
      {
        clickable: true, // hover หมุดได้
        title: "สถานที่ปลายทาง",
        detail: "shop is here",
      }
    );

    // หมุดต้นทาง ถ้าหากมีหลายอันก็สร้างเพิ่มได้ แต่มีเพียงอันเดียว
    const markerSource = new window.longdo.Marker(
      { lat: props.sourceLatitude, lon: props.sourceLongitude },
      {
        clickable: true, // hover หมุดได้
        title: "สถานที่ต้นทาง",
        detail: "I'm here",
      }
    );

    // แสดงหมุดที่ปลายทาง ถ้ากำหนด Overlays แทน Route มันจะไม่คำนวณให้
    tmpMap.Route.add(markerDestination);

    // แสดงหมุดที่ต้นทาง
    tmpMap.Route.add(markerSource);

    // กำหนดให้เลือกเส้นทางที่สั้นที่สุด
    tmpMap.Route.mode(window.longdo.RouteMode.Distance);

    // ผู้ใช้สามารถลากหมุดเป้าหมายเพื่อกำหนดเส้นทางเองได้
    tmpMap.Route.auto(true);

    // กำหนดให้มันเริ่มค้นหาเส้นทาง
    tmpMap.Route.search();

    // เก็บค่าตัวแปรแผนที่เอาไว้ เพื่อใช้กับ method อื่นๆ
    map = tmpMap;
  };

  return (
    <main className="max-w-[1400px] mx-auto mt-8 p-5">
      <div className="max-w-[900px] h-[350px] mx-auto rounded-2xl">
        <div
          id="map"
          ref={mapEl}
          className="w-full h-full rounded-2xl overflow-hidden"
        ></div>
      </div>

      <div className="p-2 mt-8 lg:text-xl">
        <p>
          {" "}
          <span className="font-semibold">สถานที่ปัจจุบัน :</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <mark className="bg-green-200">{props.sourceAddress}</mark>
        </p>
        <p className="mt-2">
          <span className="font-semibold">สถานที่ปลายทาง :</span>&nbsp;
          <mark className=" bg-orange-200">{props.destinationAddress}</mark>
        </p>
        <p className="mt-2">
          <span className="font-semibold">ระยะการเดินทาง :</span>&nbsp;&nbsp;
          <mark className=" bg-blue-200">
            {(props.distance / 1000).toFixed(1)}
          </mark>{" "}
          กม.
        </p>
      </div>

      <button
        className="mt-4 text-white bg-redrose hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2 text-center transition-colors duration-200 ease-in"
        onClick={() => props.setStagePage("entriesMap")}
      >
        ย้อนกลับ
      </button>
    </main>
  );
}
