import { useRef, useEffect } from "react";

// types
import { DisplayDetailMapProps } from "../types/DisplayDetailMapTypes";

// สร้างตัวแปรเก็บ map
let map: any = "";
export default function DisplayDetailMap(props: DisplayDetailMapProps) {
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

    // หมุดต้นทาง ถ้าหากมีหลายอันก็สร้างเพิ่มได้ แต่มีเพียงอันเดียว
    const markerSource = new window.longdo.Marker(
      { lat: props.sourceLatitude, lon: props.sourceLongitude },
      {
        clickable: false, // hover หมุดได้
        title: "สถานที่ต้นทาง",
        detail: "คุณอยู่ที่นี่",
      }
    );

    // แสดงหมุดที่ต้นทาง
    tmpMap.Route.add(markerSource);

    // แสดงหมุดที่ปลายทาง ถ้ากำหนด Overlays แทน Route มันจะไม่คำนวณให้
    tmpMap.Route.add({
      lon: props.destinationLongitude,
      lat: props.destinationLatitude,
    });

    // กำหนดให้เลือกเส้นทางที่สั้นที่สุด
    tmpMap.Route.mode(window.longdo.RouteMode.Distance);

    // ผู้ใช้ไม่สามารถลากหมุดเป้าหมายเพื่อกำหนดเส้นทางเองได้
    tmpMap.Route.auto(false);

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
            {(props.distance / 1000).toFixed(2)}
          </mark>{" "}
          กม.
        </p>
      </div>

      <button
        className="mt-4 p-2 bg-secondary hover:bg-red-700 text-white rounded-md text-md transition ease-in duration-150"
        onClick={() => props.setStagePage("entriesMap")}
      >
        ย้อนกลับ
      </button>
    </main>
  );
}
