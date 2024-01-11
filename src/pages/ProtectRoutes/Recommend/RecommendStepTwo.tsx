import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { CategoryOptionsType } from "./types/RecommendStepTwoTypes";

const Recommend2 = () => {
  const recommendPayload = useAppSelector(
    (state: RootState) => state.recommendPayload
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [categoryOption, setCategoryOption] = useState<CategoryOptionsType[]>(
    []
  );

  useEffect(() => {
    readCategoryFromCsvFile()
      .then((result) => {
        console.log(result);
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

    console.log(text);
    for (let i = 0; i < text.data.length; i++) {
      if (i === 0 || i === text.data.length - 1) continue;

      const target: any = {};
      const header = [...(text.data[0] as string[])];

      for (let j = 0; j < header.length; j++) {
        target[header[j]] = (text.data[i] as string[])[j];
      }
      categoriesTmp.push(target);
    }

    return categoriesTmp;
  };

  return (
    <React.Fragment>
      <div className="mt-12 mb-4 max-w-[1400px] mx-auto px-4">
        <h3 className="text-4xl tl:text-5xl font-bold text-center">
          ระบบแนะนำบอร์ดเกม
        </h3>

        <div className="text-2xl tl:text-3xl text-center mt-4">
          เลือกประเภทเกม
        </div>

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
                    dispatch(setCategory({ index: index, value: item.cat_en }));
                  }
                }}
                checked={
                  recommendPayload.category.find((e) => e.index === index)
                    ? true
                    : false
                }
                checkTooltip={item.description_summarize}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-row justify-between mt-6">
          <button
            onClick={() => navigate("/page/recommend")}
            className="py-2 bg-secondary hover:bg-red-700 text-white rounded-md text-md w-24 sm:w-20 transition ease-in duration-150"
          >
            ย้อนกลับ
          </button>

          <button
            onClick={() => navigate("/page/recommend/3")}
            className="py-2 bg-thrith hover:bg-orange-500 text-white rounded-md text-md w-20 sm:w-16 transition ease-in duration-150"
          >
            ต่อไป
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Recommend2;
