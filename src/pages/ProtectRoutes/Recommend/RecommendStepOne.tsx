import React from "react";
import { useNavigate } from "react-router-dom";

// icons
import { IoPlay } from "react-icons/io5";
import { IoPlayForward } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";

// hooks
import { useAppSelector, useAppDispatch } from "../../../store/hook";

// store
import {
  setPlayers,
  setTime,
  setWeight,
} from "../../../store/recommendPayloadSlice";
import type { RootState } from "../../../store/store";

// components
import CheckList from "./components/checkList";

function RecommendStepOne() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const recommendPayload = useAppSelector(
    (state: RootState) => state.recommendPayload
  );

  return (
    <React.Fragment>
      <main className="mt-12 mb-4 max-w-[1400px] px-4 mx-auto">
        <h3 className="text-4xl tl:text-5xl font-bold text-center">
          ระบบแนะนำบอร์ดเกม
        </h3>

        <div className="text-2xl tl:text-3xl text-center mt-4">
          เลือกจำนวนผู้เล่น เวลาในการเล่น และระดับความยาก
        </div>

        <div className="flex justify-center mt-8">
          <img
            src="/recommend-1.png"
            alt="pictrue error"
            className="max-w-[250px] w-full"
          />
        </div>

        <div className="max-w-4xl w-full mx-auto mt-6">
          <div className="text-2xl">เลือกจำนวนผู้เล่น</div>

          <div className="mt-4 flex flex-wrap justify-around gap-4">
            <CheckList
              title="1 - 2 คน"
              icon="/icons/person.svg"
              onClick={() => {
                dispatch(setPlayers("select_1"));
              }}
              checked={recommendPayload.players === "select_1"}
              checkTooltip={""}
            />
            <CheckList
              title="3 - 5 คน"
              icon="/icons/couple-people.svg"
              onClick={() => {
                dispatch(setPlayers("select_2"));
              }}
              checked={recommendPayload.players === "select_2"}
              checkTooltip={""}
            />
            <CheckList
              title="มากกว่า 5 คน"
              icon="/icons/multi-people.svg"
              onClick={() => {
                dispatch(setPlayers("select_3"));
              }}
              checked={recommendPayload.players === "select_3"}
              checkTooltip={""}
            />
          </div>
        </div>

        <div className="max-w-4xl w-full mx-auto mt-6">
          <div className="text-2xl">เลือกเวลาในการเล่น</div>
          <div className="mt-4 flex flex-wrap justify-around gap-4">
            <CheckList
              title="น้อยกว่า 30 นาที"
              icon={<IoPlay />}
              onClick={() => {
                dispatch(setTime("select_1"));
              }}
              checked={recommendPayload.time === "select_1"}
              checkTooltip={""}
            />
            <CheckList
              title="31 - 60 นาที"
              icon={<IoPlayForward />}
              onClick={() => {
                dispatch(setTime("select_2"));
              }}
              checked={recommendPayload.time === "select_2"}
              checkTooltip={""}
            />
            <CheckList
              title="60 นาทีขึ้นไป"
              icon={<IoPlaySkipForward />}
              onClick={() => {
                dispatch(setTime("select_3"));
              }}
              checked={recommendPayload.time === "select_3"}
              checkTooltip={""}
            />
          </div>
        </div>

        <div className="max-w-4xl w-full mx-auto mt-4">
          <div className="text-2xl">เลือกความยากของเกม</div>
          <div className="mt-4 flex flex-wrap justify-around gap-4">
            <CheckList
              title="ง่าย"
              icon="/icons/circle-E.svg"
              onClick={() => {
                dispatch(setWeight("select_1"));
              }}
              checked={recommendPayload.weight === "select_1"}
              checkTooltip={""}
            />
            <CheckList
              title="ปานกลาง"
              icon="/icons/circle-M.svg"
              onClick={() => {
                dispatch(setWeight("select_2"));
              }}
              checked={recommendPayload.weight === "select_2"}
              checkTooltip={""}
            />
            <CheckList
              title="ยาก"
              icon="/icons/circle-H.svg"
              onClick={() => {
                dispatch(setWeight("select_3"));
              }}
              checked={recommendPayload.weight === "select_3"}
              checkTooltip={""}
            />
          </div>
        </div>

        <div className="text-end mt-6">
          <button
            onClick={() => navigate("/page/recommend/2")}
            className="py-2 bg-thrith hover:bg-orange-500 text-white rounded-md text-md w-20 sm:w-16 transition ease-in duration-150"
          >
            ต่อไป
          </button>
        </div>
      </main>
    </React.Fragment>
  );
}

export default RecommendStepOne;
