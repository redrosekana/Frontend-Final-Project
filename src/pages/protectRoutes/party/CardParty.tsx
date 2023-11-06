// utils
import { axiosExtra } from "../../../utils/axiosExtra";
import { createSwal } from "../../../utils/createSwal";
import { ToastContainer } from "react-toastify";
import { toastSuccess, toastError } from "../../../utils/toastExtra";
import { customDuration } from "../../../utils/customDuration";

// interface
import { CardPartyProps } from "./CardParty.interface";

const CardParty = ({
  _id,
  name,
  limit,
  category,
  duration,
  place,
  countMember,
  owner,
  canJoin,
}: CardPartyProps) => {
  const joinParty = async (id: string) => {
    try {
      const confirm = await createSwal(
        "แจ้งเตือน",
        "คุณยืนยันที่จะเข้าร่วมปาร์ตี้ใช่หรือไม่",
        "question",
        "#00B728",
        true
      );

      if (confirm.isConfirmed) {
        await axiosExtra(`/party/participation/${id}`, "get", false, true);

        toastSuccess("เข้าร่วมปาร์ตี้นี้เรียบร้อย");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toastError("มีข้อผิดพลาด โปรดทำรายการใหม่");
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto p-4 m-0 border rounded shadow">
      <div className="flex justify-between text-2xl">
        <div>{name}</div>
        <div>
          {countMember} / {limit}
        </div>
      </div>

      <div className="mt-2">
        <div>ประเภท {category}</div>
        <div>เวลาในการเล่น {customDuration(duration)}</div>
        <div>สถานที่ {place}</div>
        <div>ผู้สร้าง {owner}</div>
      </div>

      <div className="mt-8 text-end">
        <button
          onClick={() => joinParty(_id)}
          className={`${
            limit - countMember > 0 && canJoin ? "bg-limegreen" : "bg-gray-500"
          } text-white w-16 py-1 rounded`}
          disabled={limit - countMember > 0 && canJoin ? false : true}
        >
          เข้าร่วม
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CardParty;
