// import library
import { useEffect, useState } from "react";

// components
import DisplayEntriesMap from "./components/DisplayEntriesMap";
import DisplayDetailMap from "./components/DisplayDetailMap";
import SearchMap from "./components/SearchMap";
import Reload from "../../../components/Reload";

// interface
import { InformationEntrieShop } from "../../../types/informationEntrieShopTypes";

type StagePage = "searchMap" | "entriesMap" | "displayDetailMap";

function MapProtect() {
  // ไว้เก็บรายการข้อมูล ไว้แสดงผลเมื่อคำนวณระยะทาง
  const [entrieShops, setEntrieShops] = useState<InformationEntrieShop[]>([]);
  const [entrieShop, setEntrieShop] = useState<InformationEntrieShop | unknown>(
    {}
  );

  const [stagePage, setStagePage] = useState<StagePage>("searchMap");
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {};
  }, []);

  // ฟังชันก์เมื่อมีการกดเพื่อดูระยะทางในแผนที่แต่ละร้านบอร์ดเกม
  const clickDetailMap = (
    distance: number,
    sourceAddress: string,
    destinationAddress: string,
    sourceLongitude: number,
    sourceLatitude: number,
    destinationLongitude: number,
    destinationLatitude: number,
    destinationProvince: string,
    destinationTel: string,
    destinationContact: string
  ) => {
    const information = {
      distance,
      sourceAddress,
      destinationAddress,
      sourceLongitude,
      sourceLatitude,
      destinationLongitude,
      destinationLatitude,
      destinationProvince,
      destinationTel,
      destinationContact,
    };
    setEntrieShop(information);
    setStagePage("displayDetailMap");
  };

  if (stagePage === "searchMap") {
    return (
      <>
        {reload ? <Reload /> : null}
        <SearchMap
          setEntrieShops={setEntrieShops}
          setStagePage={setStagePage}
          setReload={setReload}
        />
      </>
    );
  } else if (stagePage === "entriesMap") {
    return (
      <main className="max-w-[1400px] mx-auto mt-4 p-5">
        <div className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
          ร้านบอร์ดเกมใกล้เคียง
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {entrieShops
            .sort((a, b) => a.distance - b.distance)
            .map((entrie, index) => (
              <DisplayEntriesMap
                key={index}
                {...entrie}
                clickDetailMap={clickDetailMap}
              />
            ))}
        </div>
        <div className="mt-10">
          <button
            className="text-white bg-redrose hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-3 py-2 text-center transition-colors duration-200 ease-in"
            onClick={() => {
              setStagePage("searchMap");
              setEntrieShops([]);
            }}
          >
            ย้อนกลับ
          </button>
        </div>
      </main>
    );
  } else {
    return (
      <>
        <DisplayDetailMap
          {...(entrieShop as InformationEntrieShop)}
          setStagePage={setStagePage}
        />
      </>
    );
  }
}

export default MapProtect;
