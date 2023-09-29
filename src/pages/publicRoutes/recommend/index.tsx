// import library
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import { axiosExtra } from "../../../utils/axiosExtra";
import { isAxiosError } from "axios";

// import controller
import { createSwal } from "../../../utils/createSwal";

// import components
import Reload from "../../../components/reload";
import ItemBoardgameRecommend from "./ItemBoardgameRecommend";

// utils
import { toastError, toastSuccess } from "../../../utils/toastExtra";

// interface
import { ErrorResponse } from "../../../interfaces/axios.interface";

interface RecommendEntries {
  id: string;
  name: string;
  minplayers: number;
  maxplayers: number;
  minage: number;
  playingtime: number;
  yearpublished: number;
  description: string;
  image: string;
}

function RecommendPublic() {
  // boardgame for search engine
  const [boardgames, setBoardgames] = useState<string[]>([]);

  // current boardgame
  const [boardgameCurrent, setBoardgameCurrent] =
    useState<RecommendEntries | null>(null);

  // list boardgame for that recommend
  const [boardgameRecommend, setBoardgameRecommend] = useState<
    RecommendEntries[]
  >([]);

  // ตัวแปรผูกกับ text input element
  const [boardgameSearch, setBoardgameSearch] = useState<string>("");
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    axiosExtra("/boardgames", "get", false, false)
      .then((result) => {
        setBoardgames(result.data.data.map((element: any) => element.game));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ฟังชันก์เอาไว้ใช้เป็น callback function ในการ filter ของ search engine
  const checkConditionInput = (boardgame: string, index: number) => {
    if (boardgameSearch.includes(".") && index > 600) return false;
    if (boardgameSearch.search(/\\/gi) !== -1) return false;

    if (!boardgameSearch) {
      return false;
    } else {
      return boardgame.includes(boardgameSearch);
    }
  };

  // เมื่อเลือกเกมที่ต้องการ แล้วกดปุ่มจะทำฟังชันก์นี้เพื่อค้นหาเกมมาแนะนำ
  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!boardgameSearch) {
      createSwal("แจ้งเตือน", "โปรดใส่ชื่อบอร์ดเกม", "warning", "#ec9e18").then(
        () => {}
      );
    }

    if (!boardgames.includes(boardgameSearch)) {
      createSwal(
        "แจ้งเตือน",
        "ไม่มีชื่อบอร์ดเกมนี้",
        "warning",
        "#ec9e18"
      ).then(() => {});
    }

    try {
      const body = { boardgame_name: boardgameSearch };
      setReload(true);
      const result = await axiosExtra("/boardgames/guest", "post", body, false);
      setBoardgameSearch("");
      setBoardgameCurrent(result.data.data.boardgameCurrentResult);
      setBoardgameRecommend(result.data.data.boardgameEntriesResult);
      setReload(false);
    } catch (error) {
      setReload(false);
      setBoardgameSearch("");

      if (isAxiosError(error)) {
        const data = error.response?.data as ErrorResponse;
        console.log(data);
        toastError("เกิดข้อผิดพลาดในการทำรายการ");
      } else {
        console.log(error);
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
            className="flex items-center max-w-3xl w-full mx-auto mt-8"
            onSubmit={(ev) => onSubmit(ev)}
          >
            <div className="relative w-full h-12">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                value={boardgameSearch}
                onInput={(ev) => setBoardgameSearch(ev.currentTarget.value)}
                type="text"
                className=" bg-gray-50 border border-gray-400 text-gray-700 text-sm rounded-lg focus:ring-1 focus:ring-blue-700 focus:border-blue-700 block w-full pl-10 p-2 h-full"
                placeholder="Search"
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-limegreen rounded-lg border border-limegreen hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300"
            >
              <svg
                className="w-6 h-6"
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
            </button>
          </form>

          <div
            className={`flex flex-col gap-y-3 gap-x-4 max-w-3xl max-full mx-auto overflow-y-scroll max-h-[330px] mt-8 bg-white border border-gray-200 shadow-xl p-4 rounded-lg ${
              boardgameSearch === "" ? "hidden" : "block"
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
                      onClick={() => setBoardgameSearch(element)}
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
