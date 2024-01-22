import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { isAxiosError } from "axios";
import Cookies from "universal-cookie";

// redux
import { useAppSelector } from "../../../store/hook";
import type { RootState } from "../../../store/store";

// hooks
import useAxios from "../../../hooks/useAxios";
import { useAppDispatch } from "../../../store/hook";
import { loginRedux } from "../../../store/userSlice";
import { resetProperty } from "../../../store/recommendPayloadSlice";

// utils
import { toastSuccess, toastError } from "../../../utils/toastExtra";
import { createSwal } from "../../../utils/createSwal";
import renewToken from "../../../utils/renewToken";

// types
import { RecommendBoardgameAuthUser } from "./types/RecommendStepThreeTypes";
import { ScoreEntrieTypes } from "./types/RecommendStepThreeTypes";
import { ErrorResponse } from "../../../types/ErrorResponseTypes";

// components
import ItemBoardgameRecommendThree from "./components/ItemRecommendBoardgameAuthUser";
import ModalPostScore from "./components/ModalPostScore";

// global components
import Reload from "../../../components/Reload";

const RecommendStepThree = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const recommendPayload = useAppSelector(
    (state: RootState) => state.recommendPayload
  );

  const [recommendEntries, setRecommendEntries] = useState<
    RecommendBoardgameAuthUser[]
  >([]);
  const [checkExistEntries, setCheckExistEntries] = useState<boolean>(false);
  const [openPostScoreModal, setOpenPostScoreModel] = useState<boolean>(false);
  const [boardgameName, setBoardgameName] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [emoji, setEmoji] = useState<string>("sad.svg");
  const [scoreEntries, setScoreEntries] = useState<ScoreEntrieTypes[]>([]);
  const [reload, setReload] = useState<boolean>(false);

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
      .catch(async (error) => {
        if (isAxiosError(error)) {
          const data = error.response?.data as ErrorResponse;
          if (data.message === "token expired") {
            try {
              await renewToken();
              const result = await useAxios(
                "/boardgames/recommend",
                "post",
                body,
                true
              );
              setRecommendEntries(result.data.data);
              setCheckExistEntries(true);
            } catch (error) {
              toastError("ทำรายการไม่สำเร็จ เข้าสู่ระบบอีกครั้ง");
              cookies.remove("accessToken");
              cookies.remove("refreshToken");
              setTimeout(() => {
                navigate("/login");
              }, 2500);
            }
          } else {
            setCheckExistEntries(true);
            toastError("เกิดข้อผิดพลาดในการทำรายการ");
          }
        }
      });
  }, []);

  useEffect(() => {
    if (!openPostScoreModal) {
      setScore(0);
      setEmoji("sad.svg");
      setBoardgameName("");
    }
  }, [openPostScoreModal]);

  const saveScore = async (name: string, score: number) => {
    const body = { name, score };

    try {
      setReload(true);
      setOpenPostScoreModel(false);
      await useAxios("/score", "post", body, true);
      const updateUser = await useAxios(
        "/auth/detail-user",
        "get",
        false,
        true
      );
      dispatch(loginRedux(updateUser.data.data));
      setScoreEntries((prev) => [...prev, { name, score }]);
      setReload(false);
      toastSuccess("ให้คะแนนบอร์ดเกมเรียบร้อย");
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data as ErrorResponse;
        if (data.message === "token expired") {
          try {
            await renewToken();
            await useAxios("/score", "post", body, true);
            const updateUser = await useAxios(
              "/auth/detail-user",
              "get",
              false,
              true
            );
            dispatch(loginRedux(updateUser.data.data));
            setScoreEntries((prev) => [...prev, { name, score }]);
            setReload(false);
            toastSuccess("ให้คะแนนบอร์ดเกมเรียบร้อย");
          } catch (error) {
            setReload(false);
            toastError("ทำรายการไม่สำเร็จ เข้าสู่ระบบอีกครั้ง");
            cookies.remove("accessToken");
            cookies.remove("refreshToken");
            setTimeout(() => {
              navigate("/login");
            }, 2500);
          }
        }
      }
    }
  };

  const nextToProfilePage = () => {
    createSwal(
      "แจ้งเตือน",
      "ถ้าได้ลองเล่นเกมที่เราแนะนำไปแล้ว อย่าลืมให้คะแนนเพื่อระบบแนะนำที่ดีขึ้นด้วยนะครับ",
      "question",
      "#00B728",
      true,
      true
    ).then((result: any) => {
      if (result.isConfirmed) {
        dispatch(resetProperty());
        setTimeout(() => {
          navigate("/page/profile", { state: { redirect: true } });
        }, 200);
      }
    });
  };

  return (
    <React.Fragment>
      {reload ? <Reload /> : null}
      <main className="mt-12 mb-4 max-w-[1400px] mx-auto px-4">
        <h3 className="text-center text-xl sm:text-3xl xl:text-5xl font-bold mb-8">
          ระบบแนะนำบอร์ดเกม
        </h3>

        <div className="text-2xl tl:text-3xl text-center mt-4">
          แนะนำรายการบอร์ดเกมที่เหมาะสมสำหรับคุณ
        </div>

        {recommendEntries.length === 0 && !checkExistEntries ? (
          <Reload />
        ) : recommendEntries.length === 0 && checkExistEntries ? (
          <React.Fragment>
            <div className="text-4xl text-center mt-20">
              {" "}
              ไม่มีรายการบอร์ดเกมที่คุณเลือก
            </div>

            <div className="mt-8">
              <button
                onClick={() => navigate("/page/recommend/2")}
                className="text-white bg-redrose hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-3 py-2 text-center transition-colors duration-200 ease-in"
              >
                ย้อนกลับ
              </button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
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

            <div className="flex justify-between">
              <button
                onClick={() => navigate("/page/recommend/2")}
                className="py-2 bg-secondary hover:bg-red-700 text-white rounded-md text-md w-24 sm:w-20 transition ease-in duration-150"
              >
                ย้อนกลับ
              </button>

              <button
                onClick={nextToProfilePage}
                className="py-2 bg-thrith hover:bg-orange-500 text-white rounded-md text-md w-20 sm:w-16 transition ease-in duration-150"
              >
                ต่อไป
              </button>
            </div>
          </React.Fragment>
        )}
      </main>

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

      <ToastContainer />
    </React.Fragment>
  );
};

export default RecommendStepThree;
