import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { isAxiosError } from "axios";
import Cookies from "universal-cookie";

// hooks
import useAxios from "../../../hooks/useAxios";
import { useAppDispatch } from "../../../store/hook";
import { loginRedux } from "../../../store/userSlice";

// global components
import Reload from "../../../components/Reload";

// global types
import { ErrorResponse } from "../../../types/ErrorResponseTypes";

// utils
import { createSwal } from "../../../utils/createSwal";
import { toastError, toastSuccess } from "../../../utils/toastExtra";
import renewToken from "../../../utils/renewToken";

// components
import SearchBoardgameRecommendInput from "../../PublicRoutes/Recommend/components/FormSearchBoardgameRecommend";
import ItemRecommendBoardgameAuthUser from "../Recommend/components/ItemRecommendBoardgameAuthUser";
import ModalPostScore from "../Recommend/components/ModalPostScore";

import { FormSearchBoardgameRecommend } from "../../PublicRoutes/Recommend/types/RecommendTypes";
import { ScoreEntrieTypes } from "../Recommend/types/RecommendStepThreeTypes";
import { RecommendBoardgameAuthUser } from "../Recommend/types/RecommendStepThreeTypes";

const BoardgameRatingOnly = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [boardgames, setBoardgames] = useState<string[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [boardgameCurrent, setBoardgameCurrent] =
    useState<RecommendBoardgameAuthUser | null>(null);

  const [boardgameName, setBoardgameName] = useState<string>("");
  const [scoreEntries, setScoreEntries] = useState<ScoreEntrieTypes[]>([]);
  const [openPostScoreModal, setOpenPostScoreModel] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [emoji, setEmoji] = useState<string>("sad.svg");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormSearchBoardgameRecommend>({
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    if (!openPostScoreModal) {
      setScore(0);
      setEmoji("sad.svg");
      setBoardgameName("");
    }
  }, [openPostScoreModal]);

  useEffect(() => {
    useAxios("/boardgames", "get", false, false)
      .then((result) => {
        setBoardgames(result.data.data.map((boardgame: any) => boardgame.game));
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
      setValue("search", "");
      setReload(true);
      const body = { boardgame_name: data.search.trim() };
      const result = await useAxios("/boardgames/guest", "post", body, false);
      const boardgameCurrentResult = result.data.data.boardgameCurrentResult;

      setBoardgameCurrent(boardgameCurrentResult);
      setReload(false);
    } catch (error) {
      setReload(false);
      toastError("เกิดข้อผิดพลาดในการทำรายการ");
    }
  };

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

  return (
    <React.Fragment>
      {reload ? <Reload /> : null}
      <main>
        <div className="mt-12 mb-4 max-w-[1400px] mx-auto px-4">
          <h3 className="text-center text-4xl md:text-5xl font-semibold">
            ให้คะแนนบอร์ดเกม
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

          {boardgameCurrent ? (
            <div className="mt-16">
              <div className="font-semibold text-4xl">เกมที่คุณค้นหา</div>
              <ItemRecommendBoardgameAuthUser
                {...boardgameCurrent}
                scoreEntries={scoreEntries}
                setBoardgameName={setBoardgameName}
                setOpenPostScoreModel={setOpenPostScoreModel}
                index={0}
              />
            </div>
          ) : null}
        </div>
      </main>

      <ToastContainer />

      <ModalPostScore
        boardgameName={boardgameName}
        score={score}
        emoji={emoji}
        openPostScoreModal={openPostScoreModal}
        setEmoji={setEmoji}
        setScore={setScore}
        setOpenPostScoreModel={setOpenPostScoreModel}
        saveScore={saveScore}
      />
    </React.Fragment>
  );
};

export default BoardgameRatingOnly;
