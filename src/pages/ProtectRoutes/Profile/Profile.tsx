import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { isAxiosError } from "axios";
import { ToastContainer } from "react-toastify";

// redux
import type { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/hook";

// global components
import Reload from "../../../components/Reload";

// components
import ButtonProfilePage from "./components/ButtonProfilePage";
import InputProfile from "./components/InputProfile";
import BoardgameListEvaluted from "./components/BoardgameListUsedEvalute";
import ModalAvatar from "./components/ModalAvatar";
import ModalPassword from "./components/ModalPassword";
import ModalInformation from "./components/ModalInformation";

// utils
import { toastError, toastSuccess } from "../../../utils/toastExtra";

// global types
import { ErrorResponse } from "../../../types/ErrorResponseTypes";

// types
import { FormatCheckConfirmPassword } from "./types/ProfileTypes";

// hooks
import useAxios from "../../../hooks/useAxios";

function Profile() {
  const selector = useAppSelector((state: RootState) => state.users);

  console.log(selector);

  // ตัวแปรควบคุมการเปิดปิด modal
  const [showModalPassword, setShowModalPassword] = useState<boolean>(false);
  const [showModalInformation, setShowModalInformation] =
    useState<boolean>(false);
  const [showModalAvatar, setShowModalAvatar] = useState<boolean>(false);

  const [displayName, setDisplayName] = useState<string>(
    selector.displayName as string
  );
  const [username, setUsername] = useState<string>(selector.username as string);
  const [email, setEmail] = useState<string>(selector.email as string);
  const [avatar, setAvatar] = useState<string>(selector.urlAvatar as string);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [isSubmitChangePassword, setIsSubmitChangePassword] =
    useState<boolean>(false);
  const [checkConfirmPassword, setCheckConfirmPassword] =
    useState<FormatCheckConfirmPassword>({
      text: "รหัสผ่านไม่ตรงกัน",
      status: false,
    });

  const [reload, setReload] = useState<boolean>(false);

  // ฟังชันก์ในการควบคุมการเปิดปิด modal password
  const onOpenPasswordButton = () => setShowModalPassword(true);
  const onClosePasswordButton = () => setShowModalPassword(false);

  // ฟังชันก์ในการควบคุมการเปิดปิด modal information
  const onOpenInformationButton = () => setShowModalInformation(true);
  const onCloseInformationButton = () => setShowModalInformation(false);

  // ฟังชันก์ในการควบคุมการเปิดปิด avatar information
  const openAvatarButton = () => setShowModalAvatar(true);
  const closeAvatarButton = () => setShowModalAvatar(false);

  useEffect(() => {
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setCheckConfirmPassword((prev) => ({ ...prev, status: false }));
    setIsSubmitChangePassword(false);
  }, [showModalPassword]);

  useEffect(() => {
    if (newPassword === confirmNewPassword)
      setCheckConfirmPassword((prev) => ({ ...prev, status: false }));
  }, [newPassword, confirmNewPassword]);

  useEffect(() => {
    setDisplayName(selector.displayName as string);
    setUsername(selector.username as string);
  }, [showModalInformation]);

  useEffect(() => {
    setAvatar(selector.urlAvatar as string);
  }, [showModalAvatar]);

  // ฟังชันก์ทำงานเมื่อกดยืนยันการเปลี่ยนรหัสผ่าน
  const onChangePassword = async () => {
    setIsSubmitChangePassword(true);

    if (
      !oldPassword.trim() ||
      !newPassword.trim() ||
      !confirmNewPassword.trim()
    ) {
      return;
    }
    if (newPassword.trim() !== confirmNewPassword.trim()) {
      setCheckConfirmPassword((prev) => ({ ...prev, status: true }));
      return;
    }

    try {
      const body = {
        password_old: oldPassword.trim(),
        password_new: newPassword.trim(),
      };

      setShowModalPassword(false);
      setReload(true);
      await useAxios("/auth/password", "post", body, true);

      setReload(false);
      toastSuccess("เปลี่ยนรหัสผ่านเรียบร้อย");
    } catch (error) {
      setReload(false);

      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;
        if (Array.isArray(data.message)) {
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        } else if (data.message === "invalid old password") {
          toastError("รหัสผ่านเดิมไม่ถูกต้อง");
        } else {
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        }
      } else {
        toastError("เกิดข้อผิดพลาดในการทำรายการ");
      }
    }
  };

  // ฟังชันก์ทำงานเมื่อกดยืนยันการเปลี่ยนแปลงข้อมูล
  const onChangeInformation = async () => {
    if (selector.provider === "password") {
      if (!displayName.trim() || !username.trim()) return;

      if (
        displayName.trim() === selector.displayName &&
        username.trim() === selector.username
      ) {
        setShowModalInformation(false);
        return;
      }
    }

    if (selector.provider === "google") {
      if (!displayName.trim()) return;
      if (displayName.trim() === selector.displayName) {
        setShowModalInformation(false);
        return;
      }
    }
    try {
      const body = {
        displayName,
        username,
      };

      setReload(true);
      await useAxios("/users", "patch", body, true);

      setReload(false);
      setShowModalInformation(false);
      toastSuccess("อัพเดทข้อมูลผู้ใช้งานเรียบร้อย");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setShowModalInformation(false);
      setReload(false);

      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;
        if (Array.isArray(data.message)) {
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        } else if (data.message === "displayName is repeated") {
          toastError("ชื่อแสดงในเว็บไซต์ถูกใช้งานแล้ว");
        } else if (data.message === "username is repeated") {
          toastError("ชื่อผู้ใช้งานถูกใช้งานแล้ว");
        } else {
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        }
      } else {
        toastError("เกิดข้อผิดพลาดในการทำรายการ");
      }
    }
  };

  // ฟังชันก์ทำงานเมื่อกดยืนยันการเปลี่ยน avatar
  const clickUpdateAvtar = async () => {
    try {
      const body = {
        url: avatar,
      };

      setShowModalAvatar(false);
      setReload(true);
      await useAxios("/users/avatar", "patch", body, true);

      setReload(false);
      toastSuccess("เปลี่ยน avatar เรียบร้อย");
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      setReload(false);
      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;
        toastError("เกิดข้อผิดพลาดในการทำรายการ");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <main>
      {reload ? <Reload /> : null}
      <div className="max-w-[1400px] w-full mx-auto p-6">
        <h3 className="text-3xl lg:text-4xl font-bold text-center">
          ข้อมูลและประวัติผู้ใช้งาน
        </h3>

        <div className="mt-8 flex flex-col items-center">
          <div className="mb-8 relative">
            <div className="max-w-[300px] z-20">
              <img src={selector.urlAvatar} alt="avatar" className="w-full" />
            </div>
            <div
              onClick={() => openAvatarButton()}
              className="cursor-pointer absolute right-9 bottom-3 rounded-full bg-zinc-50 z-0 w-12 h-12 flex justify-center items-center shadow"
            >
              <i className="fa-regular fa-pen-to-square text-xl"></i>
            </div>
          </div>

          {selector.provider === "password" ? (
            <div className="max-w-lg w-full">
              <InputProfile
                title="ชื่อผู้ใช้งาน"
                type="text"
                value={username}
              />
              <InputProfile
                title="ชื่อที่แสดงในเว็บไซต์"
                type="text"
                value={displayName}
              />
              <InputProfile title="อีเมลล์" type="text" value={email} />
            </div>
          ) : (
            <div className="max-w-lg w-full">
              <InputProfile
                title="ชื่อที่แสดงในเว็บไซต์"
                type="text"
                value={displayName}
              />
              <InputProfile title="อีเมลล์" type="text" value={email} />
            </div>
          )}

          <div className=" flex flex-col gap-y-2 max-w-md w-full mb-4">
            <label className="text-xl">รายการบอร์ดเกมที่เคยประเมิน</label>

            {selector.scoreEntries?.length === 0 ? (
              <div className="text-center text-lg">
                คุณยังไม่เคยให้คะแนนบอร์ดเกม :(
              </div>
            ) : (
              selector.scoreEntries?.map((entrie, index) => {
                return (
                  <BoardgameListEvaluted
                    key={index}
                    name={entrie.name}
                    score={entrie.score}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-y-2 items-center telephone:flex-row justify-center gap-x-4">
          <NavLink to="/page/home" className="w-full telephone:w-[130px]">
            <ButtonProfilePage
              title="ย้อนกลับ"
              color="bg-redrose"
              hover="bg-red-800"
              shadow="red-400"
            />
          </NavLink>
          {selector.provider === "password" ? (
            <ButtonProfilePage
              onClick={onOpenPasswordButton}
              title="เปลี่ยนรหัสผ่าน"
              color="bg-limegreen"
              hover="bg-green-500"
              shadow="green-400"
            />
          ) : null}
          <ButtonProfilePage
            onClick={onOpenInformationButton}
            title="แก้ไขข้อมูล"
            color="bg-yellow-400"
            hover="bg-yellow-500"
            shadow="yellow-400"
          />
        </div>

        <ModalAvatar
          showModal={showModalAvatar}
          avatar={avatar}
          onClose={closeAvatarButton}
          setAvatar={setAvatar}
          clickUpdateAvtar={clickUpdateAvtar}
          closeAvatarButton={closeAvatarButton}
        />

        <ModalPassword
          showModal={showModalPassword}
          onClose={onClosePasswordButton}
          onChangePassword={onChangePassword}
          form={{
            oldPassword,
            newPassword,
            confirmNewPassword,
            setOldPassword,
            setNewPassword,
            setConfirmNewPassword,
          }}
          isSubmit={isSubmitChangePassword}
          checkConfirmPassword={checkConfirmPassword}
        />

        <ModalInformation
          showModal={showModalInformation}
          onClose={onCloseInformationButton}
          provider={selector?.provider as string}
          form={{ displayName, username, setDisplayName, setUsername }}
          onChangeInformation={onChangeInformation}
        />
      </div>
      <ToastContainer />
    </main>
  );
}

export default Profile;
