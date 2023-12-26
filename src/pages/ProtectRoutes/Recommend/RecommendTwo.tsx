import { useEffect, useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse";

// redux
import { useAppSelector, useAppDispatch } from "../../../store/hook";
import {
  setCategory,
  setAllCategory,
} from "../../../store/recommendPayloadSlice";
import type { RootState } from "../../../store/store";

// utils
import { VITE_BASE } from "../../../utils/getEnv";

// components
import CheckList from "./components/checkList";

// types
import { CategoryOptionsType } from "./types/RecommendTwoTypes";

const Recommend2 = () => {
  const recommendPayload = useAppSelector(
    (state: RootState) => state.recommendPayload
  );

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const [categoryDetail, setCategoryDetail] = useState<CategoryOptionsType>({
    bgg_url: "",
    cat_en: "",
    cat_th: "",
    description_th: "",
    pic_url: "",
  });
  const [categoryOption, setCategoryOption] = useState<CategoryOptionsType[]>(
    []
  );

  useEffect(() => {
    readCategoryFromCsvFile()
      .then((result) => {
        setCategoryOption(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const readCategoryFromCsvFile = async () => {
    const result = await axios.get(`${VITE_BASE}/category.csv`);
    const text = Papa.parse(result.data);

    let categoriesTmp = [];
    for (let i = 0; i < text.data.length; i++) {
      if (i === 0 || i === text.data.length - 1) continue;

      const target: any = {};
      const header = [...(text.data[0] as string)];

      for (let j = 0; j < header.length; j++) {
        target[header[j]] = (text.data[i] as any[])[j];
      }
      categoriesTmp.push(target);
    }

    return categoriesTmp;
  };

  return (
    <main>
      <div className="mt-8 p-5 max-w-[1400px] mx-auto relative">
        <h3 className="text-center text-xl sm:text-3xl xl:text-5xl font-bold mb-8">
          ระบบแนะนำบอร์ดเกม
        </h3>

        <div className="text-center text-lg sm:text-xl xl:text-3xl">
          เลือกประเภทเกม
        </div>

        {/* {Object.entries(categoryDetail)[0][1] ? (
          <div className="flex justify-center mt-8 max-w-[260px] w-full h-[260px] rounded-full mx-auto">
            <img
              src={categoryDetail.pic_url}
              alt="pictrue error"
              className="w-full rounded-full object-cover"
            />
          </div>
        ) : null}

        {Object.entries(categoryDetail)[0][1] ? (
          <div className="max-w-4xl w-full mx-auto mt-6">
            <div>
              <h3 className="text-2xl">ข้อมูล {categoryDetail?.cat_th}</h3>
              <p className="text-lg">{categoryDetail?.description_th}</p>
            </div>
          </div>
        ) : null} */}

        <div className="max-w-4xl w-full mx-auto mt-6">
          <div className="text-2xl">ประเภทเกม</div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-6">
            {categoryOption.map((item, index) => (
              <CheckList
                key={index}
                title={item.cat_th}
                icon={item.pic_url}
                onClick={() => {
                  if (item.cat_en === "All") {
                    const t = categoryOption.map((e, index) => ({
                      index: index,
                      value: e.cat_en,
                    }));

                    dispatch(setAllCategory(t));
                  } else {
                    setCategoryDetail(item);
                    dispatch(setCategory({ index: index, value: item.cat_en }));
                  }
                }}
                checked={
                  recommendPayload.category.find((e) => e.index === index)
                    ? true
                    : false
                }
              />
            ))}
          </div>
        </div>

        <div className="max-w-[800px] w-full mx-auto mt-10">
          <div className="flex justify-between">
            <div className="w-32 text-start">
              <button
                onClick={() => navigate("/page/recommend")}
                className="text-white bg-redrose hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-3 py-2 text-center transition-colors duration-200 ease-in"
              >
                ย้อนกลับ
              </button>
            </div>

            <div className="w-32 text-end">
              <button
                onClick={() => navigate("/page/recommend/3")}
                className="text-white bg-orangey hover:bg-orange-400 focus:ring-2 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-md px-3 py-2 text-center transition-colors duration-200 ease-in"
              >
                ต่อไป
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Recommend2;
