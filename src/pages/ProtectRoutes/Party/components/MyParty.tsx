import { ToastContainer } from "react-toastify";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import Cookies from "universal-cookie";

// global types
import { ErrorResponse } from "../../../../types/ErrorResponseTypes";

// redux
import type { RootState } from "../../../../store/store";
import { useAppSelector, useAppDispatch } from "../../../../store/hook";
import { loginRedux } from "../../../../store/userSlice";

// utils
import { createSwal } from "../../../../utils/createSwal";
import { customDuration } from "../../../../utils/customDuration";
import { toastSuccess, toastError } from "../../../../utils/toastExtra";
import renewToken from "../../../../utils/renewToken";

// hooks
import useAxios from "../../../../hooks/useAxios";

const MyParty = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ownerParty, memberParty } = useAppSelector(
    (state: RootState) => state.users
  );

  const [profileModal, setProfileModal] = useState<boolean>(false);
  const [displayMemberInsideModal, setDisplayMemberInsideModal] = useState<{
    displayName?: string;
    email?: string;
    urlAvatar?: string;
    tel?: string;
    address?: string;
  }>({});

  const name = ownerParty?.name || memberParty?.name;
  const limit = ownerParty?.limit || memberParty?.limit;
  const duration = ownerParty?.duration || memberParty?.duration;
  const place = ownerParty?.place || memberParty?.place;
  const id = ownerParty?._id || memberParty?._id;
  const description = ownerParty?.description || memberParty?.description;
  const category = ownerParty?.category || memberParty?.category;
  const owner = ownerParty?.owner.email || memberParty?.owner.email;
  const memberEntries = ownerParty?.member || memberParty?.member;
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
        await useAxios(
          ownerParty ? `/party/removing/${id}` : `/party/leaving/${id}`,
          ownerParty ? "delete" : "get",
          false,
          true
        );
        const updateUser = await useAxios(
          "/auth/detail-user",
          "get",
          false,
          true
        );
        dispatch(loginRedux(updateUser.data.data));
        toastSuccess(
          ownerParty ? "ลบปาร์ตี้นี้เรียบร้อย" : "ออกจากปาร์ตี้นี้เรียบร้อย"
        );
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data as ErrorResponse;
        if (data.message === "token expired") {
          try {
            await renewToken();
            await useAxios(
              ownerParty ? `/party/removing/${id}` : `/party/leaving/${id}`,
              ownerParty ? "delete" : "get",
              false,
              true
            );
            const updateUser = await useAxios(
              "/auth/detail-user",
              "get",
              false,
              true
            );
            dispatch(loginRedux(updateUser.data.data));
            toastSuccess(
              ownerParty ? "ลบปาร์ตี้นี้เรียบร้อย" : "ออกจากปาร์ตี้นี้เรียบร้อย"
            );
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

  const openModal = async (informationMember: {
    displayName?: string;
    email?: string;
    urlAvatar?: string;
    tel?: string;
    address?: string;
  }) => {
    setProfileModal(true);
    setDisplayMemberInsideModal(informationMember);
  };

  return (
    <>
      {memberParty || ownerParty ? (
        <div className="border rounded shadow-sm p-4 max-w-4xl w-full mx-auto">
          <div className="text-end">
            <span className="text-3xl">
              {countMember} / {limit}
            </span>
          </div>
          <div>
            <span className="text-2xl">ชื่อปาร์ตี้:</span> &nbsp;{" "}
            <span className="text-xl font-medium">{name}</span>
          </div>
          <div className="mt-1">
            <span className="text-2xl">ประเภทของเกม:</span> &nbsp;{" "}
            <span className="text-xl font-medium">{category}</span>
          </div>
          <div className="mt-1">
            <span className="text-2xl">เวลาในการเล่นเกม:</span> &nbsp;{" "}
            <span className="text-xl font-medium">
              {customDuration(duration as number)}
            </span>
          </div>
          <div className="mt-1">
            <span className="text-2xl">จำนวนสมาชิกในปาร์ตี้:</span> &nbsp;{" "}
            <span className="text-xl font-medium">
              {countMember} / {limit} คน
            </span>
          </div>

          <div className="mt-1">
            <span className="text-2xl">สถานที่เล่นเกม:</span> &nbsp;{" "}
            <span className="text-xl font-medium">{place}</span>
          </div>
          <div className="mt-1">
            <span className="text-2xl">อีเมลเจ้าของปาร์ตี้:</span> &nbsp;{" "}
            <span className="text-xl font-medium">{owner}</span>
          </div>
          <div className="flex items-center">
            <div className="text-2xl">สมาชิก:</div> &nbsp;{" "}
            <div className="flex">
              {memberEntries?.map((member, index) => {
                return (
                  <div
                    key={index}
                    className="max-w-[35px] cursor-pointer"
                    onClick={() => openModal(member)}
                  >
                    <img src={member.urlAvatar} className="w-full" />
                  </div>
                );
              })}
            </div>
          </div>
          {description ? (
            <div className="mt-1">
              <span className="text-2xl">รายละเอียด:</span> &nbsp;{" "}
              <span className="text-xl font-medium">{description}</span>
            </div>
          ) : null}
          <div className="mt-8 text-end">
            <button
              className=" bg-red-600 p-2 text-white rounded"
              onClick={() => leaveParty(id as string)}
            >
              {ownerParty ? "ลบปาร์ตี้" : "ออกจากปาร์ตี้"}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl max-w-4xl w-full mx-auto">
          <span>
            ตอนนี้คุณยังไม่มีปาร์ตี้ สามารถที่จะสร้างปาร์ตี้เอง
            หรือเข้าร่วมกับผู้อื่นได้
          </span>
        </div>
      )}

      <Modal show={profileModal} onClose={() => setProfileModal(false)}>
        <Modal.Header>ข้อมูลสมาชิก</Modal.Header>
        <Modal.Body>
          <div>
            <div className="flex items-center">
              <span className="text-xl">รูป avatar ผู้ใช้งาน:&nbsp;</span>
              <div className="max-w-[35px] cursor-pointer">
                <img
                  src={displayMemberInsideModal.urlAvatar}
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <span className="text-xl">
                ชื่อแสดงในเว็บไซต์ของผู้ใช้งาน:&nbsp;
              </span>
              <span className="text-lg font-medium">
                {displayMemberInsideModal.displayName}
              </span>
            </div>
            <div>
              <span className="text-xl">อีเมลผู้ใช้งาน:&nbsp;</span>
              <span className="text-lg font-medium">
                {displayMemberInsideModal.email}
              </span>
            </div>
            {displayMemberInsideModal?.tel ? (
              <div>
                <span className="text-xl">เบอร์โทรศัพท์ผู้ใช้งาน:&nbsp;</span>
                <span className="text-lg font-medium">024869374</span>
              </div>
            ) : null}
            {displayMemberInsideModal.address ? (
              <div>
                <span className="text-xl">ที่อยู่ผู้ใช้งาน:&nbsp;</span>
                <span className="text-lg font-medium">ซอยผาสุข</span>
              </div>
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default MyParty;
