import React, { useEffect, useState } from "react";

// components
import DisplayEntriesMap from "./components/DisplayEntriesMap";
import DisplayDetailMap from "./components/DisplayDetailMap";
import SearchMap from "./components/SearchMap";
import Reload from "../../../components/Reload";

// types
import { StagePage } from "./types/MapTypes";

// global types
import { InformationEntrieShop } from "../../../types/informationEntrieShopTypes";

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
  const clickDetailMap = (information: InformationEntrieShop) => {
    setEntrieShop(information);
    setStagePage("displayDetailMap");
  };

  if (stagePage === "searchMap") {
    return (
      <React.Fragment>
        {reload ? <Reload /> : null}
        <SearchMap
          setEntrieShops={setEntrieShops}
          setStagePage={setStagePage}
          setReload={setReload}
        />
      </React.Fragment>
    );
  } else if (stagePage === "entriesMap") {
    return (
      <main className="mt-12 mb-4 max-w-[1400px] mx-auto px-4">
        <h3 className="text-center text-4xl md:text-5xl font-semibold">
          ร้านบอร์ดเกมใกล้เคียง
        </h3>

        <div className="mt-8 flex flex-wrap justify-end gap-y-6">
          {entrieShops
            .sort((a, b) => a.distance - b.distance)
            .map((entrie, index) => (
              <DisplayEntriesMap
                key={index}
                clickDetailMap={clickDetailMap}
                {...entrie}
              />
            ))}
        </div>

        <div className="mt-10">
          <button
            className="py-2 px-3 bg-secondary hover:bg-red-700 text-white rounded-md text-md transition ease-in duration-150"
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
      <DisplayDetailMap
        {...(entrieShop as InformationEntrieShop)}
        setStagePage={setStagePage}
      />
    );
  }
}

export default MapProtect;
