import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip, Modal } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import { isAxiosError } from "axios";
import Cookies from "universal-cookie";

// redux
import type { RootState } from "../../../../store/store";
import { useAppSelector, useAppDispatch } from "../../../../store/hook";
import { loginRedux } from "../../../../store/userSlice";

// utils
import { toastSuccess, toastError } from "../../../../utils/toastExtra";
import { createSwal } from "../../../../utils/createSwal";
import renewToken from "../../../../utils/renewToken";

// hooks
import useAxios from "../../../../hooks/useAxios";

// global types
import { ErrorResponse } from "../../../../types/ErrorResponseTypes";

const ManageParty = ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state: RootState) => state.users);

  const [profileModal, setProfileModal] = useState<boolean>(false);
  const [displayMemberInsideModal, setDisplayMemberInsideModal] = useState<{
    displayName?: string;
    email?: string;
    urlAvatar?: string;
  }>({});

  const openModal = async (informationMember: {
    displayName?: string;
    email?: string;
    urlAvatar?: string;
  }) => {
    setProfileModal(true);
    setDisplayMemberInsideModal(informationMember);
  };

  const expulsionMember = async (userId: string, partyId: string) => {
    try {
      const confirm = await createSwal(
        "ยืนยัน",
        "ต้องการนำผู้เล่นคนนี้ออกจากปาร์ตี้",
        "question",
        "#00B728",
        true
      );

      if (confirm.isConfirmed) {
        await useAxios(
          `/party/expulsion/${partyId}`,
          "patch",
          { user_id: userId },
          true
        );
        const updateUser = await useAxios(
          "/auth/detail-user",
          "get",
          false,
          true
        );
        dispatch(loginRedux(updateUser.data.data));
        toastSuccess("ทำการนำสมาชิกออกสำเร็จ");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data as ErrorResponse;
        if (data.message === "token expired") {
          try {
            await renewToken();
            await useAxios(
              `/party/expulsion/${partyId}`,
              "patch",
              { user_id: userId },
              true
            );
            const updateUser = await useAxios(
              "/auth/detail-user",
              "get",
              false,
              true
            );
            dispatch(loginRedux(updateUser.data.data));
            toastSuccess("ทำการนำสมาชิกออกสำเร็จ");
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

  const transferOwner = async (userId: string, partyId: string) => {
    try {
      const confirm = await createSwal(
        "ยืนยัน",
        "ต้องการนำสิทธิหัวหน้าปาร์ตี้ให้กับสมาชิกคนนี้",
        "question",
        "#00B728",
        true
      );

      if (confirm.isConfirmed) {
        await useAxios(
          `/party/transference-owner/${partyId}`,
          "patch",
          { user_id: userId },
          true
        );
        toastSuccess("ทำการโอนย้ายหัวหน้าปาร์ตี้สำเร็จ");
        setTimeout(async () => {
          const updateUser = await useAxios(
            "/auth/detail-user",
            "get",
            false,
            true
          );
          dispatch(loginRedux(updateUser.data.data));
          setState(1);
        }, 2500);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data as ErrorResponse;
        if (data.message === "token expired") {
          try {
            await renewToken();
            await useAxios(
              `/party/transference-owner/${partyId}`,
              "patch",
              { user_id: userId },
              true
            );
            toastSuccess("ทำการโอนย้ายหัวหน้าปาร์ตี้สำเร็จ");
            setTimeout(async () => {
              const updateUser = await useAxios(
                "/auth/detail-user",
                "get",
                false,
                true
              );
              dispatch(loginRedux(updateUser.data.data));
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

  const filterMemberWithoutOwner = (member: any) => {
    return selector.ownerParty?.owner._id !== member._id;
  };

  console.log(selector);

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="text-3xl text-center font-semibold">ค้นหาปาร์ตี้</div>

        <div className="max-w-2xl w-full mx-auto mt-4">
          {selector.memberParty?.member
            .filter(filterMemberWithoutOwner)
            .map((data, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col tl:flex-row items-center tl:justify-between mt-8 gap-y-3 tl:gap-y-0"
                >
                  <div className="flex items-center gap-x-3">
                    <span>
                      <img
                        src={data.urlAvatar}
                        className=" max-w-[50px] w-full cursor-pointer"
                        onClick={() => openModal(data)}
                      />
                    </span>
                    <span className=" text-2xl">{data.displayName}</span>
                  </div>

                  <div className="flex gap-x-3">
                    <div
                      className="w-8 h-8 bg-orangey rounded-lg flex justify-center items-center cursor-pointer"
                      onClick={() =>
                        transferOwner(
                          data._id,
                          selector.ownerParty?._id as string
                        )
                      }
                    >
                      <Tooltip content="มอบหัวหน้าปาร์ตี้">
                        <i className="fa-solid fa-arrow-right-from-bracket text-lg text-white"></i>
                      </Tooltip>
                    </div>
                    <div
                      className="w-8 h-8 bg-red-500 rounded-lg flex justify-center items-center cursor-pointer"
                      onClick={() =>
                        expulsionMember(
                          data._id,
                          selector.ownerParty?._id as string
                        )
                      }
                    >
                      <Tooltip content="เตะผู้เล่น">
                        <i className="fa-regular fa-circle-xmark text-lg text-white"></i>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

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
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  );
};

export default ManageParty;
