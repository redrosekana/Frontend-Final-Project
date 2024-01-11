import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { isAxiosError } from "axios";
import { ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";

// redux
import type { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/hook";
import { useDispatch } from "react-redux";
import { loginRedux } from "../../../store/userSlice";

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
import renewToken from "../../../utils/renewToken";

// global types
import { ErrorResponse } from "../../../types/ErrorResponseTypes";

// types
import { FormatCheckConfirmPassword } from "./types/ProfileTypes";

// hooks
import useAxios from "../../../hooks/useAxios";
import React from "react";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = useAppSelector((state: RootState) => state.users);
  const cookies = new Cookies();
  const location = useLocation();

  // useRef
  const topicScoreEntrieRef = useRef<HTMLDivElement>(null);

  // useState
  const [showModalPassword, setShowModalPassword] = useState<boolean>(false);
  const [showModalInformation, setShowModalInformation] =
    useState<boolean>(false);
  const [showModalAvatar, setShowModalAvatar] = useState<boolean>(false);

  const [displayName, setDisplayName] = useState<string>(
    selector.displayName as string
  );
  const [reload, setReload] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(selector.username as string);
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

  useEffect(() => {
    if (location.state?.redirect) {
      window.scrollTo(
        0,
        (topicScoreEntrieRef.current?.offsetTop as number) / 2
      );
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

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

    const body = {
      password_old: oldPassword.trim(),
      password_new: newPassword.trim(),
    };

    try {
      setShowModalPassword(false);
      setReload(true);
      await useAxios("/auth/password", "post", body, true);
      const updateUser = await useAxios(
        "/auth/detail-user",
        "get",
        false,
        true
      );
      dispatch(loginRedux(updateUser.data.data));
      setReload(false);
      toastSuccess("เปลี่ยนรหัสผ่านเรียบร้อย");
    } catch (error) {
      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;
        if (Array.isArray(data.message)) {
          setReload(false);
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        } else if (data.message === "invalid old password") {
          setReload(false);
          toastError("รหัสผ่านเดิมไม่ถูกต้อง");
        } else if (data.message === "token expired") {
          try {
            await renewToken();
            await useAxios("/auth/password", "post", body, true);
            const updateUser = await useAxios(
              "/auth/detail-user",
              "get",
              false,
              true
            );
            dispatch(loginRedux(updateUser.data.data));
            setReload(false);
            toastSuccess("เปลี่ยนรหัสผ่านเรียบร้อย");
          } catch (error) {
            setReload(false);
            toastError("ทำรายการไม่สำเร็จ เข้าสู่ระบบอีกครั้ง");
            cookies.remove("accessToken");
            cookies.remove("refreshToken");
            setTimeout(() => {
              navigate("/login");
            }, 2500);
          }
        }
      }
    }
  };

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

    const body = {
      displayName,
      username,
    };

    try {
      setShowModalInformation(false);
      setReload(true);
      await useAxios("/users", "patch", body, true);
      const updateUser = await useAxios(
        "/auth/detail-user",
        "get",
        false,
        true
      );
      dispatch(loginRedux(updateUser.data.data));
      setReload(false);
      toastSuccess("อัพเดทข้อมูลผู้ใช้งานเรียบร้อย");
    } catch (error) {
      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;
        if (Array.isArray(data.message)) {
          setReload(false);
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        } else if (data.message === "displayName is repeated") {
          setReload(false);
          toastError("ชื่อแสดงในเว็บไซต์ถูกใช้งานแล้ว");
        } else if (data.message === "username is repeated") {
          setReload(false);
          toastError("ชื่อผู้ใช้งานถูกใช้งานแล้ว");
        } else if (data.message === "token expired") {
          try {
            await renewToken();
            await useAxios("/users", "patch", body, true);
            const updateUser = await useAxios(
              "/auth/detail-user",
              "get",
              false,
              true
            );
            dispatch(loginRedux(updateUser.data.data));
            setReload(false);
            toastSuccess("อัพเดทข้อมูลผู้ใช้งานเรียบร้อย");
          } catch (error) {
            setReload(false);
            toastError("ทำรายการไม่สำเร็จ เข้าสู่ระบบอีกครั้ง");
            cookies.remove("accessToken");
            cookies.remove("refreshToken");
            setTimeout(() => {
              navigate("/login");
            }, 2500);
          }
        }
      }
    }
  };

  const onClickUpdateAvtar = async () => {
    const body = {
      url: avatar,
    };
    try {
      setShowModalAvatar(false);
      setReload(true);
      await useAxios("/users/avatar", "patch", body, true);
      const updateUser = await useAxios(
        "/auth/detail-user",
        "get",
        false,
        true
      );
      dispatch(loginRedux(updateUser.data.data));
      setReload(false);
      toastSuccess("เปลี่ยน avatar เรียบร้อย");
    } catch (error) {
      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;
        if (data.message === "token expired") {
          try {
            await renewToken();
            await useAxios("/users/avatar", "patch", body, true);
            const updateUser = await useAxios(
              "/auth/detail-user",
              "get",
              false,
              true
            );
            dispatch(loginRedux(updateUser.data.data));
            setReload(false);
            toastSuccess("เปลี่ยน avatar เรียบร้อย");
          } catch (error) {
            setReload(false);
            toastError("ทำรายการไม่สำเร็จ เข้าสู่ระบบอีกครั้ง");
            cookies.remove("accessToken");
            cookies.remove("refreshToken");
            setTimeout(() => {
              navigate("/login");
            }, 2500);
          }
        } else {
          setReload(false);
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        }
      }
    }
  };

  const onClickRemoveScoring = async (name: string) => {
    const body = {
      scoreBoardgameNameEntries: [name],
    };

    try {
      setReload(true);
      await useAxios("/users/scoring", "patch", body, true);
      const updateUser = await useAxios(
        "/auth/detail-user",
        "get",
        false,
        true
      );
      dispatch(loginRedux(updateUser.data.data));
      setReload(false);
      toastSuccess("ลบบอร์ดเกมนี้เรียบร้อย");
    } catch (error) {
      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;
        if (data.message === "token expired") {
          try {
            await renewToken();
            await useAxios("/users/scoring", "patch", body, true);
            const updateUser = await useAxios(
              "/auth/detail-user",
              "get",
              false,
              true
            );
            dispatch(loginRedux(updateUser.data.data));
            setReload(false);
            toastSuccess("ลบบอร์ดเกมนี้เรียบร้อย");
          } catch (error) {
            setReload(false);
            toastError("ทำรายการไม่สำเร็จ เข้าสู่ระบบอีกครั้ง");
            cookies.remove("accessToken");
            cookies.remove("refreshToken");
            setTimeout(() => {
              navigate("/login");
            }, 2500);
          }
        } else {
          setReload(false);
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        }
      }
    }
  };

  return (
    <React.Fragment>
      {reload ? <Reload /> : null}
      <div className="mt-12 mb-4 max-w-[1400px] mx-auto px-4">
        <h3 className="text-3xl tl:text-4xl lg:text-5xl font-bold text-center">
          ข้อมูลและประวัติผู้ใช้งาน
        </h3>

        <div className="flex flex-col items-center mt-4">
          <div className="mb-8 relative">
            <div className="max-w-[250px] tl:max-w-[300px] w-full z-20">
              <img src={selector.urlAvatar} alt="avatar" className="w-full" />
            </div>
            <div
              onClick={() => setShowModalAvatar(true)}
              className="cursor-pointer absolute right-9 bottom-3 rounded-full bg-zinc-50 z-0 w-12 h-12 flex justify-center items-center shadow"
            >
              <i className="fa-regular fa-pen-to-square text-xl"></i>
            </div>
          </div>

          {selector.provider === "password" ? (
            <div className="max-w-xl w-full">
              <InputProfile
                title="ชื่อผู้ใช้งาน"
                type="text"
                value={selector.username}
              />
              <InputProfile
                title="ชื่อที่แสดงในเว็บไซต์"
                type="text"
                value={selector.displayName}
              />
              <InputProfile
                title="อีเมลล์"
                type="text"
                value={selector.email}
              />
            </div>
          ) : (
            <div className="max-w-xl w-full">
              <InputProfile
                title="ชื่อที่แสดงในเว็บไซต์"
                type="text"
                value={selector.displayName}
              />
              <InputProfile
                title="อีเมลล์"
                type="text"
                value={selector.email}
              />
            </div>
          )}

          <div className="max-w-2xl w-full my-4">
            <div
              className="text-2xl text-center mb-4"
              ref={topicScoreEntrieRef}
            >
              รายการบอร์ดเกมที่เคยประเมิน
            </div>

            {selector.scoring?.scoreEntries?.length === 0 ? (
              <div className="text-center text-lg">
                คุณยังไม่เคยให้คะแนนบอร์ดเกม :(
              </div>
            ) : (
              selector.scoring?.scoreEntries.map((entrie, index) => {
                return (
                  <BoardgameListEvaluted
                    key={index}
                    name={entrie.name}
                    score={entrie.score}
                    onClickRemoveScoring={onClickRemoveScoring}
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
              color="bg-secondary"
              hover="bg-red-700"
            />
          </NavLink>
          {selector.provider === "password" ? (
            <ButtonProfilePage
              onClick={() => setShowModalPassword(true)}
              title="เปลี่ยนรหัสผ่าน"
              color="bg-primary"
              hover="bg-green-500"
            />
          ) : null}
          <ButtonProfilePage
            onClick={() => setShowModalInformation(true)}
            title="แก้ไขข้อมูล"
            color="bg-yellow-400"
            hover="bg-yellow-500"
          />
        </div>
      </div>

      <ModalAvatar
        showModal={showModalAvatar}
        avatar={avatar}
        onClose={setShowModalAvatar}
        setAvatar={setAvatar}
        onClickUpdateAvtar={onClickUpdateAvtar}
      />

      <ModalPassword
        showModal={showModalPassword}
        onClose={setShowModalPassword}
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
        onClose={setShowModalInformation}
        provider={selector?.provider as string}
        form={{ displayName, username, setDisplayName, setUsername }}
        onChangeInformation={onChangeInformation}
      />

      <ToastContainer />
    </React.Fragment>
  );
}

export default Profile;
