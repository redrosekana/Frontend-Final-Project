import { useEffect, useState } from "react";
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
import ItemBoardgameRecommend from "./components/ItemBoardgameRecommend";

// types
import {
  RecommendEntries,
  FormSearchBoardgameRecommend,
} from "./types/RecommendTypes";

// hooks
import useAxios from "../../../hooks/useAxios";

function RecommendPublic() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormSearchBoardgameRecommend>({
    defaultValues: {
      search: "",
    },
  });

  const [reload, setReload] = useState<boolean>(false);
  const [boardgames, setBoardgames] = useState<string[]>([]);
  const [boardgameCurrent, setBoardgameCurrent] =
    useState<RecommendEntries | null>(null);

  const [boardgameRecommend, setBoardgameRecommend] = useState<
    RecommendEntries[]
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

  // ฟังชันก์เอาไว้ใช้เป็น callback function ในการ filter ของ search engine
  const checkConditionInput = (boardgame: string, index: number) => {
    if (watch("search").includes(".") && index > 600) return false;
    if (watch("search").search(/\\/gi) !== -1) return false;

    if (!watch("search")) {
      return false;
    } else {
      return new RegExp(watch("search"), "ig").test(boardgame);
    }
  };

  // เมื่อเลือกเกมที่ต้องการ แล้วกดปุ่มจะทำฟังชันก์นี้เพื่อค้นหาเกมมาแนะนำ
  const onSubmit: SubmitHandler<FormSearchBoardgameRecommend> = async (
    data: FormSearchBoardgameRecommend
  ) => {
    if (!boardgames.includes(data.search)) {
      createSwal("แจ้งเตือน", "ไม่มีชื่อบอร์ดเกมนี้", "warning", "#ec9e18");
      return;
    }

    try {
      const body = { boardgame_name: data.search.trim() };

      setReload(true);
      const result = await useAxios("/boardgames/guest", "post", body, false);

      const filterBoardgameCurrentResult =
        result.data.data.boardgameCurrentResult;
      const filterBoardgameEntriesResult =
        result.data.data.boardgameEntriesResult.filter(
          (item: RecommendEntries) => item
        );

      setValue("search", "");
      setBoardgameCurrent(filterBoardgameCurrentResult);
      setBoardgameRecommend(filterBoardgameEntriesResult);
      setReload(false);
    } catch (error) {
      setReload(false);

      if (isAxiosError(error)) {
        toastError("เกิดข้อผิดพลาดในการทำรายการ");
      } else {
        toastError("เกิดข้อผิดพลาดในการทำรายการ");
      }
    }
  };

  return (
    <>
      {reload ? <Reload /> : null}
      <main>
        <div className="px-5 mt-12 max-w-[1400px] mx-auto">
          <h3 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold">
            Recommend Boardgame
          </h3>
          <form
            className="flex items-center gap-x-2 max-w-3xl w-full mx-auto mt-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SearchBoardgameRecommendInput
              type="text"
              placeholder="Search"
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
                .map((element: string, index: number) => {
                  return (
                    <span
                      onClick={() => setValue("search", element)}
                      key={index}
                      className="border border-gray-200 cursor-pointer rounded-md shadow-md text-center bg-slate-50 p-4 h-10 flex justify-center items-center hover:bg-slate-100 active:bg-slate-200 transition duration-75 ease-in"
                    >
                      {element}
                    </span>
                  );
                })
            )}
          </div>

          {boardgameCurrent ? (
            <div className="mt-16">
              <div className="font-semibold text-4xl">เกมที่คุณค้นหา</div>
              <ItemBoardgameRecommend {...boardgameCurrent} />
            </div>
          ) : null}

          {boardgameRecommend.length !== 0 ? (
            <div className="mt-16">
              <div className="font-semibold text-4xl">เกมที่แนะนำ</div>
              {boardgameRecommend.map((boardgame, index) => (
                <ItemBoardgameRecommend
                  key={index}
                  {...boardgame}
                  index={index}
                />
              ))}
            </div>
          ) : null}
        </div>
        <ToastContainer />
      </main>
    </>
  );
}

export default RecommendPublic;
