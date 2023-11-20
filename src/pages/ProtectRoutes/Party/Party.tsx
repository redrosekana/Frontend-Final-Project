import { useState } from "react";
import ItemAdvice from "../../../components/ItemAdvice";

// components
import CreateParty from "./components/CreateParty";
import FindParty from "./components/FindParty";
import MyParty from "./components/MyParty";
import ManageParty from "./components/ManageParty";

// redux
import type { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/hook";

function PartyProtect() {
  const selector = useAppSelector((state: RootState) => state.users);

  const [stage, setStage] = useState<number>(
    selector.ownerParty || selector.memberParty ? 1 : 4
  );

  return (
    <main>
      <div className="mt-8 p-5 max-w-[1400px] mx-auto">
        <div className="text-center text-xl sm:text-3xl xl:text-5xl font-bold mb-8">
          เข้าร่วมปาร์ตี้
        </div>

        <div className="mt-4 mb-8 ml-4">
          <p className="text-lg sm:text-xl lg:text-2xl">คำแนะนำการใช้งาน</p>
          <ul>
            <ItemAdvice content="ผู้ใช้งานสามารถเข้าร่วมได้ปาร์ตี้เดียวเท่านั้น" />
            <ItemAdvice content="ผู้ใช้งานที่เป็นเจ้าของปาร์ตี้ จะไม่สามารถเข้าร่วมกับปาร์ตี้อื่นได้ ต้องทำการลบปาร์ตี้ที่ตนเองสร้างก่อน" />
            <ItemAdvice content="ผู้ใช้งานที่เป็นเจ้าของปาร์ตี้ เมื่อทำการลบปาร์ตี้ ผู้ใช้ที่เป็นสมาชิกในปาร์ตี้จะออกจากปาร์ตี้อัตโนมัติ" />
          </ul>
        </div>

        <section className="border border-x-0 border-t-0 flex mb-8">
          <div
            className={`p-3 cursor-pointer hover:bg-slate-50  ${
              stage === 1 ? " text-blue-500 bg-slate-100" : "text-gray-500"
            }`}
            onClick={() => setStage(1)}
          >
            ปาร์ตี้ที่เข้าร่วม
          </div>
          {selector.ownerParty ? (
            <div
              className={`p-3 cursor-pointer hover:bg-slate-50  ${
                stage === 2 ? " text-blue-500 bg-slate-100" : "text-gray-500"
              }`}
              onClick={() => setStage(2)}
            >
              จัดการปาร์ตี้
            </div>
          ) : null}
          {!selector.ownerParty && !selector.memberParty ? (
            <div
              className={`p-3 cursor-pointer hover:bg-slate-50  ${
                stage === 3 ? " text-blue-500 bg-slate-100" : "text-gray-500"
              }`}
              onClick={() => setStage(3)}
            >
              สร้างปาร์ตี้
            </div>
          ) : null}
          <div
            className={`p-3 cursor-pointer hover:bg-slate-50  ${
              stage === 4 ? " text-blue-500 bg-slate-100" : "text-gray-500"
            }`}
            onClick={() => setStage(4)}
          >
            ค้นหาปาร์ตี้
          </div>
        </section>

        {stage === 1 ? (
          <MyParty />
        ) : stage === 2 ? (
          <ManageParty />
        ) : stage === 3 ? (
          <CreateParty />
        ) : (
          <FindParty />
        )}
      </div>
    </main>
  );
}

export default PartyProtect;
