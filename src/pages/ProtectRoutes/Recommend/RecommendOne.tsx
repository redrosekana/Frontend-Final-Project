import { useNavigate, NavigateFunction } from "react-router-dom";

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

function RecommendOne() {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const recommendPayload = useAppSelector(
    (state: RootState) => state.recommendPayload
  );

  return (
    <main>
      <div className="mt-8 p-5 max-w-[1400px] mx-auto">
        <h3 className="text-center text-xl sm:text-3xl xl:text-5xl font-bold mb-8">
          ระบบแนะนำบอร์ดเกม
        </h3>

        <div className="text-center text-lg sm:text-xl xl:text-3xl">
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

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CheckList
              title="1 - 2 คน"
              icon="/icons/person.svg"
              onClick={() => {
                dispatch(setPlayers("select_1"));
              }}
              checked={recommendPayload.players === "select_1"}
            />
            <CheckList
              title="3 - 5 คน"
              icon="/icons/couple-people.svg"
              onClick={() => {
                dispatch(setPlayers("select_2"));
              }}
              checked={recommendPayload.players === "select_2"}
            />
            <CheckList
              title="มากกว่า 5 คน"
              icon="/icons/multi-people.svg"
              onClick={() => {
                dispatch(setPlayers("select_3"));
              }}
              checked={recommendPayload.players === "select_3"}
            />
          </div>
        </div>

        <div className="max-w-4xl w-full mx-auto mt-6">
          <div className="text-2xl">เลือกเวลาในการเล่น</div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CheckList
              title="15 - 30 นาที"
              icon="/icons/happy.svg"
              onClick={() => {
                dispatch(setTime("select_1"));
              }}
              checked={recommendPayload.time === "select_1"}
            />
            <CheckList
              title="30 นาทีขึ้นไป"
              icon="/icons/love.svg"
              onClick={() => {
                dispatch(setTime("select_2"));
              }}
              checked={recommendPayload.time === "select_2"}
            />
            <CheckList
              title="1 ชั่วโมงขึ้นไป"
              icon="/icons/surprise.svg"
              onClick={() => {
                dispatch(setTime("select_3"));
              }}
              checked={recommendPayload.time === "select_3"}
            />
          </div>
        </div>

        <div className="max-w-4xl w-full mx-auto mt-6">
          <div className="text-2xl">เลือกความยากของเกม</div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CheckList
              title="ง่าย"
              icon="/icons/circle-E.svg"
              onClick={() => {
                dispatch(setWeight("select_1"));
              }}
              checked={recommendPayload.weight === "select_1"}
            />
            <CheckList
              title="ปานกลาง"
              icon="/icons/circle-M.svg"
              onClick={() => {
                dispatch(setWeight("select_2"));
              }}
              checked={recommendPayload.weight === "select_2"}
            />
            <CheckList
              title="ยาก"
              icon="/icons/circle-H.svg"
              onClick={() => {
                dispatch(setWeight("select_3"));
              }}
              checked={recommendPayload.weight === "select_3"}
            />
          </div>
        </div>

        <div className="max-w-4xl w-full mx-auto mt-10">
          <div className="grid grid-cols-3">
            <div></div>
            <div></div>
            <div className="flex justify-center">
              <div className="w-32 text-end">
                <button
                  onClick={() => navigate("/page/recommend/2")}
                  className="text-white bg-orangey hover:bg-orange-400 focus:ring-2 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-md px-3 py-2 text-center transition-colors duration-200 ease-in"
                >
                  ต่อไป
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RecommendOne;
