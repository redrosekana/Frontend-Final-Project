// redux
import type { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/hook";

// utils
import { axiosExtra } from "../../../utils/axiosExtra";
import { createSwal } from "../../../utils/createSwal";
import { customDuration } from "../../../utils/customDuration";
import { toastSuccess, toastError } from "../../../utils/toastExtra";

// library
import { ToastContainer } from "react-toastify";

const MyParty = () => {
  const { ownerParty, memberParty } = useAppSelector(
    (state: RootState) => state.users
  );

  const name = ownerParty?.name || memberParty?.name;
  const limit = ownerParty?.limit || memberParty?.limit;
  const duration = ownerParty?.duration || memberParty?.duration;
  const place = ownerParty?.place || memberParty?.place;
  const id = ownerParty?._id || memberParty?._id;

  const category = ownerParty?.category || memberParty?.category;
  const owner = ownerParty?.owner.email || memberParty?.owner.email;
  const countMember = ownerParty?.countMember || memberParty?.countMember;

  const leaveParty = async (id: string) => {
    try {
      const confirm = await createSwal(
        "แจ้งเตือน",
        "คุณยืนยันที่จะออกจากปาร์ตี้ใช่หรือไม่",
        "question",
        "#00B728",
        true
      );

      if (confirm.isConfirmed) {
        await axiosExtra(
          ownerParty ? `/party/removing/${id}` : `/party/leaving/${id}`,
          ownerParty ? "delete" : "get",
          false,
          true
        );

        toastSuccess(
          ownerParty ? "ลบปาร์ตี้นี้เรียบร้อย" : "ออกจากปาร์ตี้นี้เรียบร้อย"
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toastError("เกิดข้อผิดพลาด โปรดทำรายการใหม่อีกครั้ง");
    }
  };

  return (
    <>
      {memberParty || ownerParty ? (
        <div className="border rounded shadow-sm p-4">
          <div className="text-end">
            <span className="text-3xl">
              {countMember} / {limit}
            </span>
          </div>
          <div>
            <span className="text-2xl">ชื่อปาร์ตี้:</span> &nbsp;{" "}
            <span className="text-xl font-semibold">{name}</span>
          </div>
          <div className="mt-1">
            <span className="text-2xl">ประเภทของเกม:</span> &nbsp;{" "}
            <span className="text-xl font-semibold">{category}</span>
          </div>
          <div className="mt-1">
            <span className="text-2xl">เวลาในการเล่นเกม:</span> &nbsp;{" "}
            <span className="text-xl font-semibold">
              {customDuration(duration as number)}
            </span>
          </div>
          <div className="mt-1">
            <span className="text-2xl">จำนวนสมาชิกที่มีได้ในปาร์ตี้:</span>{" "}
            &nbsp; <span className="text-xl font-semibold">{limit} คน</span>
          </div>
          <div className="mt-1">
            <span className="text-2xl">
              จำนวนสมาชิกที่สามารถรับเพิ่มได้ในปาร์ตี้:
            </span>{" "}
            &nbsp;{" "}
            <span className="text-xl font-semibold">
              {(limit as number) - (countMember as number)} คน
            </span>
          </div>
          <div className="mt-1">
            <span className="text-2xl">สถานที่เล่นเกม:</span> &nbsp;{" "}
            <span className="text-xl font-semibold">{place}</span>
          </div>
          <div className="mt-1">
            <span className="text-2xl">อีเมลเจ้าของปาร์ตี้:</span> &nbsp;{" "}
            <span className="text-xl font-semibold">{owner}</span>
          </div>
          <div className="mt-4 text-end">
            <button
              className=" bg-red-600 p-2 text-white rounded"
              onClick={() => leaveParty(id as string)}
            >
              {ownerParty ? "ลบปาร์ตี้" : "ออกจากปาร์ตี้"}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl">
          <span>
            ตอนนี้คุณยังไม่มีปาร์ตี้ สามารถที่จะสร้างปาร์ตี้เอง
            หรือเข้าร่วมกับผู้อื่นได้
          </span>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default MyParty;
