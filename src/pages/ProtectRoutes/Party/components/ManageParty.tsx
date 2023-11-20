import { useState } from "react";
import { Tooltip, Modal } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import { isAxiosError } from "axios";

// redux
import type { RootState } from "../../../../store/store";
import { useAppSelector } from "../../../../store/hook";

// utils
import { toastSuccess, toastError } from "../../../../utils/toastExtra";
import { createSwal } from "../../../../utils/createSwal";

// hooks
import useAxios from "../../../../hooks/useAxios";

const ManageParty = () => {
  const [profileModal, setProfileModal] = useState<boolean>(false);
  const selector = useAppSelector((state: RootState) => state.users);
  const [displayMemberInsideModal, setDisplayMemberInsideModal] = useState<{
    displayName?: string;
    email?: string;
    urlAvatar?: string;
    tel?: string;
    address?: string;
  }>({});

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

        toastSuccess("ทำการนำสมาชิกออกสำเร็จ");
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    } catch (error) {
      console.log(error);

      if (isAxiosError(error)) {
        console.log("ok");
        toastError("ok");
      } else {
        console.log(error);
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
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterMemberWithoutOwner = (e: any) => {
    return selector.ownerParty?.owner._id !== e._id;
  };

  return (
    <>
      <div className="container max-w-3xl w-full mx-auto p-4">
        <div className="text-center text-3xl mb-8">จัดการสมาชิกในปาร์ตี้</div>
        {selector.memberParty?.member
          .filter(filterMemberWithoutOwner)
          .map((data, index) => {
            return (
              <div
                key={index}
                className="flex flex-col telephone:flex-row items-center telephone:justify-between mt-8 gap-y-3 telephone:gap-y-0"
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
                    <Tooltip content="Tranfer owner">
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
                    <Tooltip content="Fired member">
                      <i className="fa-regular fa-circle-xmark text-lg text-white"></i>
                    </Tooltip>
                  </div>
                </div>
              </div>
            );
          })}
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

export default ManageParty;
