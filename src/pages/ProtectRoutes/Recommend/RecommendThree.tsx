import { useEffect, useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// redux
import { useAppSelector } from "../../../store/hook";
import type { RootState } from "../../../store/store";

// hooks
import useAxios from "../../../hooks/useAxios";

// utils
import { toastSuccess, toastError } from "../../../utils/toastExtra";

// types
import { BoardgameRecommendThreeTypes } from "./types/RecommendThreeTypes";
import { ScoreEntrieTypes } from "./types/RecommendThreeTypes";

// components
import ItemBoardgameRecommendThree from "./components/itemBoardgameRecommendThree";
import ModalPostScore from "./components/ModalPostScore";
import ModalConfirmScore from "./components/ModalConfirmScore";

// global components
import Reload from "../../../components/Reload";

const RecommendThree = () => {
  const recommendPayload = useAppSelector(
    (state: RootState) => state.recommendPayload
  );
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const category = recommendPayload.category.map(
      (category) => category.value
    );
    const body = { ...recommendPayload, category };

    useAxios("/boardgames/recommend", "post", body, true)
      .then((result) => {
        setRecommendEntries(result.data.data);
        setCheckExistEntries(true);
      })
      .catch((error) => console.log(error));
  }, []);

  const [recommendEntries, setRecommendEntries] = useState<
    BoardgameRecommendThreeTypes[]
  >([]);
  const [checkExistEntries, setCheckExistEntries] = useState<boolean>(false);
  const [openPostScoreModal, setOpenPostScoreModel] = useState<boolean>(false);
  const [openConfirmScoreModal, setOpenConfirmScoreModel] =
    useState<boolean>(false);
  const [boardgameName, setBoardgameName] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [emoji, setEmoji] = useState<string>("sad.svg");
  const [scoreEntries, setScoreEntries] = useState<ScoreEntrieTypes[]>([]);

  useEffect(() => {
    setScore(0);
    setEmoji("sad.svg");
  }, [openPostScoreModal]);

  useEffect(() => {
    if (scoreEntries.length === 0) {
      setOpenConfirmScoreModel(false);
    }
  }, [scoreEntries]);

  const saveScore = () => {
    setScoreEntries((prev) => [...prev, { name: boardgameName, score: score }]);
    setOpenPostScoreModel(false);
  };

  const confirmScore = async () => {
    const body = { score_entries: scoreEntries };

    try {
      await useAxios("/score", "post", body, true);
      setOpenConfirmScoreModel(false);
      toastSuccess("ให้คะแนนบอร์ดเกมเรียบร้อย");

      setTimeout(() => {
        window.location.href = "/page/profile";
      }, 2000);
    } catch (error) {
      console.log(error);
      setOpenConfirmScoreModel(false);
      toastError("เกิดข้อผิดพลาด");
    }
  };

  return (
    <main>
      <div className="mt-8 p-5 max-w-[1400px] mx-auto relative">
        <h3 className="text-center text-xl sm:text-3xl xl:text-5xl font-bold mb-8">
          ระบบแนะนำบอร์ดเกม
        </h3>

        <div className="text-center text-lg sm:text-xl xl:text-3xl">
          แนะนำรายการบอร์ดเกมที่เหมาะสมสำหรับคุณ
        </div>

        {recommendEntries.length === 0 && !checkExistEntries ? (
          <Reload />
        ) : recommendEntries.length === 0 && checkExistEntries ? (
          <>
            <div className="text-4xl text-center mt-20">
              {" "}
              ไม่มีรายการบอร์ดเกมที่คุณเลือก
            </div>
            <div className="max-w-[1400px] w-full mx-auto mt-10">
              <div className="flex justify-between">
                <div className="w-32 text-start">
                  <button
                    onClick={() => navigate("/page/recommend/2")}
                    className="text-white bg-redrose hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-3 py-2 text-center transition-colors duration-200 ease-in"
                  >
                    ย้อนกลับ
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="max-w-[1400px] w-full mx-auto mt-8">
              {recommendEntries.map((entrie, index) => {
                return (
                  <ItemBoardgameRecommendThree
                    key={index}
                    {...entrie}
                    index={index}
                    setOpenPostScoreModel={setOpenPostScoreModel}
                    setBoardgameName={setBoardgameName}
                    scoreEntries={scoreEntries}
                  />
                );
              })}
            </div>
            <div className="max-w-[1400px] w-full mx-auto mt-10">
              <div className="flex justify-between">
                <div>
                  <button
                    onClick={() => navigate("/page/recommend/2")}
                    className="text-white bg-redrose hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-3 py-2 text-center transition-colors duration-200 ease-in"
                  >
                    ย้อนกลับ
                  </button>
                </div>

                <div className="w-44 text-end">
                  <button
                    onClick={confirmScore}
                    className="text-white bg-limegreen hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md px-3 py-2 text-center transition-colors duration-200 ease-in"
                  >
                    ยืนยันการให้คะแนนเกม
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <ModalPostScore
        boardgameName={boardgameName}
        score={score}
        emoji={emoji}
        openPostScoreModal={openPostScoreModal}
        setScore={setScore}
        setEmoji={setEmoji}
        setOpenPostScoreModel={setOpenPostScoreModel}
        saveScore={saveScore}
      />

      <ModalConfirmScore
        openConfirmScoreModal={openConfirmScoreModal}
        scoreEntries={scoreEntries}
        setOpenConfirmScoreModel={setOpenConfirmScoreModel}
        setScoreEntries={setScoreEntries}
        confirmScore={confirmScore}
      />

      {scoreEntries.length !== 0 ? (
        <div
          onClick={() => setOpenConfirmScoreModel(true)}
          className="fixed bottom-2 right-1 w-10 h-10 cursor-pointer rounded-lg flex justify-center items-center"
        >
          <div className="absolute top-1 right-1 w-4 h-4 rounded-sm bg-limegreen text-white flex justify-center items-center">
            {scoreEntries.length}
          </div>
          <i className="fa-regular fa-bell text-2xl"></i>
        </div>
      ) : null}

      <ToastContainer />
    </main>
  );
};

export default RecommendThree;
