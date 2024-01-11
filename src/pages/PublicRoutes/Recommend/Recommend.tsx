import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { isAxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

// import utils
import { createSwal } from "../../../utils/createSwal";
import { toastError } from "../../../utils/toastExtra";

// global components
import Reload from "../../../components/Reload";

// component
import SearchBoardgameRecommendInput from "./components/FormSearchBoardgameRecommend";
import ItemRecommendBoardGuestUser from "./components/ItemRecommendBoardgameGuestUser";

// types
import {
  RecommendBoardgameEntries,
  FormSearchBoardgameRecommend,
} from "./types/RecommendTypes";

// hooks
import useAxios from "../../../hooks/useAxios";

function RecommendPublic() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormSearchBoardgameRecommend>({
    defaultValues: {
      search: "",
    },
  });

  const [reload, setReload] = useState<boolean>(false);
  const [boardgames, setBoardgames] = useState<string[]>([]);
  const [currentBoardgame, setCurrentBoardgame] =
    useState<RecommendBoardgameEntries | null>(null);
  const [recommendBoardgameEntries, setRecommendBoardgameEntries] = useState<
    RecommendBoardgameEntries[]
  >([]);

  useEffect(() => {
    useAxios("/boardgames", "get", false, false)
      .then((result) => {
        setBoardgames(result.data.data.map((element: any) => element.game));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const checkConditionInput = (boardgame: string, index: number) => {
    if (watch("search").includes(".") && index > 600) return false;
    if (watch("search").search(/\\/gi) !== -1) return false;

    if (!watch("search")) {
      return false;
    } else {
      return new RegExp(watch("search"), "ig").test(boardgame);
    }
  };

  const onSubmit: SubmitHandler<FormSearchBoardgameRecommend> = async (
    data: FormSearchBoardgameRecommend
  ) => {
    if (!boardgames.includes(data.search)) {
      createSwal("แจ้งเตือน", "ไม่มีชื่อบอร์ดเกมนี้", "warning", "#ec9e18");
      return;
    }

    try {
      setReload(true);
      const body = { boardgame_name: data.search.trim() };
      const result = await useAxios("/boardgames/guest", "post", body, false);

      const filterBoardgameCurrentResult =
        result.data.data.boardgameCurrentResult;
      const filterBoardgameEntriesResult =
        result.data.data.boardgameEntriesResult.filter(
          (item: RecommendBoardgameEntries) => item
        );

      setValue("search", "");
      setCurrentBoardgame(filterBoardgameCurrentResult);
      setRecommendBoardgameEntries(filterBoardgameEntriesResult);
      setReload(false);
    } catch (error) {
      setReload(false);
      toastError("เกิดข้อผิดพลาดในการทำรายการ");
    }
  };

  return (
    <React.Fragment>
      {reload ? <Reload /> : null}
      <main>
        <div className="mt-12 mb-4 max-w-[1400px] mx-auto px-4">
          <h3 className="text-center text-4xl md:text-5xl font-semibold">
            ค้นหาเกมที่คุณสนใจ
          </h3>

          <form
            className="flex items-center gap-x-2 max-w-3xl w-full mx-auto mt-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SearchBoardgameRecommendInput
              type="text"
              placeholder="ค้นหา"
              register={register}
              required
            />
          </form>
          {errors.search?.type === "required" ? (
            <div className="text-red-700 max-w-3xl w-full mx-auto mt-2 text-lg">
              โปรดกรอกรายชื่อบอร์ดเกม
            </div>
          ) : null}

          <div
            className={`flex flex-col gap-y-3 gap-x-4 max-w-3xl max-full mx-auto overflow-y-scroll max-h-[330px] mt-8 bg-white border border-gray-200 shadow-xl p-4 rounded-lg ${
              watch("search") === "" ? "hidden" : "block"
            }`}
          >
            {boardgames.filter(checkConditionInput).length === 0 ? (
              <span className="text-center">ไม่พบชื่อบอร์ดเกม</span>
            ) : (
              boardgames
                .filter(checkConditionInput)
                .map((boardgame: string, index: number) => {
                  return (
                    <span
                      onClick={() => setValue("search", boardgame)}
                      key={index}
                      className="border border-gray-200 cursor-pointer rounded-md shadow-md text-center bg-slate-50 p-4 h-10 flex justify-center items-center hover:bg-slate-100 active:bg-slate-200 transition ease-in duration-100"
                    >
                      {boardgame}
                    </span>
                  );
                })
            )}
          </div>

          {currentBoardgame ? (
            <React.Fragment>
              <div className="font-semibold text-4xl mt-16">เกมที่คุณค้นหา</div>
              <ItemRecommendBoardGuestUser {...currentBoardgame} />
            </React.Fragment>
          ) : null}

          {recommendBoardgameEntries.length !== 0 ? (
            <React.Fragment>
              <div className="font-semibold text-4xl mt-16">เกมที่แนะนำ</div>
              {recommendBoardgameEntries.map((recommendBoardgame, index) => (
                <ItemRecommendBoardGuestUser
                  key={index}
                  {...recommendBoardgame}
                  index={index}
                />
              ))}
            </React.Fragment>
          ) : null}
        </div>
      </main>
      <ToastContainer />
    </React.Fragment>
  );
}

export default RecommendPublic;
