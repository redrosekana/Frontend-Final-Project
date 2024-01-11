import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { isAxiosError } from "axios";

// utils
import { createSwal } from "../../../../utils/createSwal";
import { ToastContainer } from "react-toastify";
import { toastSuccess, toastError } from "../../../../utils/toastExtra";
import { customDuration } from "../../../../utils/customDuration";
import renewToken from "../../../../utils/renewToken";

// redux
import { useAppDispatch } from "../../../../store/hook";
import { loginRedux } from "../../../../store/userSlice";

// hooks
import useAxios from "../../../../hooks/useAxios";

// global types
import { ErrorResponse } from "../../../../types/ErrorResponseTypes";

// interface
import { CardPartyProps } from "../types/CardPartyTypes";

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
  setState,
}: CardPartyProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cookies = new Cookies();

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
        await useAxios(`/party/participation/${id}`, "get", false, true);
        const updateUser = await useAxios(
          "/auth/detail-user",
          "get",
          false,
          true
        );
        dispatch(loginRedux(updateUser.data.data));
        toastSuccess("เข้าร่วมปาร์ตี้นี้เรียบร้อย");
        setTimeout(() => {
          setState(1);
        }, 2500);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data as ErrorResponse;
        if (data.message === "token expired") {
          try {
            await renewToken();
            await useAxios(`/party/participation/${id}`, "get", false, true);
            const updateUser = await useAxios(
              "/auth/detail-user",
              "get",
              false,
              true
            );
            dispatch(loginRedux(updateUser.data.data));
            toastSuccess("เข้าร่วมปาร์ตี้นี้เรียบร้อย");
            setTimeout(() => {
              setState(1);
            }, 2500);
          } catch (error) {
            toastError("ทำรายการไม่สำเร็จ เข้าสู่ระบบอีกครั้ง");
            cookies.remove("accessToken");
            cookies.remove("refreshToken");
            setTimeout(() => {
              navigate("/login");
            }, 2500);
          }
        } else {
          toastError("เกิดข้อผิดพลาด");
        }
      }
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
            limit - countMember > 0 && canJoin ? "bg-primary" : "bg-gray-500"
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
