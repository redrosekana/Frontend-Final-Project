// import library
import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { isAxiosError } from "axios";
import { ToastContainer } from "react-toastify";
import { Modal } from "flowbite-react";

// assets
import avatar from "../../../assets/avatar.svg";

// component
import Reload from "../../../components/reload";
import Button from "./Button";
import InputProfile from "./InputProfile";
import BoardgameListEvaluted from "./BoardgameListUsedEvalute";
import InputOnModalPassword from "./InputOnModalPassword";
import InputOnModalInformation from "./InputOnModalInformation";

// context
import { Store } from "../../../context/store";

// utils
import { axiosExtra } from "../../../utils/axiosExtra";
import { toastError, toastSuccess } from "../../../utils/toastExtra";

// interface
import { ErrorResponse } from "../../../interfaces/axios.interface";

function Profile() {
  const context = useContext(Store);
  const [reload, setReload] = useState<boolean>(false);

  // ตัวแปรควบคุมการเปิดปิด modal
  const [modalPassword, setModalPassword] = useState<boolean>(false);
  const [modalInformation, setModalInformation] = useState<boolean>(false);

  const [displayName, setDisplayName] = useState<string>(
    context?.displayName as string
  );
  const [username, setUsername] = useState<string>(context?.username as string);
  const [email, setEmail] = useState<string>(context?.email as string);
  const [passwordOld, setPasswordOld] = useState<string>("");
  const [passwordNew, setPasswordNew] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isUpdateSubmit, setIsUpdateSubmit] = useState<boolean>(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState({
    text: "รหัสผ่านไม่ตรงกัน",
    status: false,
  });

  // ฟังชันก์ในการควบคุมการเปิดปิด modal password
  const openPasswordButton = () => setModalPassword((prev) => !prev);
  const closePasswordButton = () => setModalPassword((prev) => !prev);

  // ฟังชันก์ในการควบคุมการเปิดปิด modal information
  const openInformationButton = () => setModalInformation((prev) => !prev);
  const closeInformationButton = () => setModalInformation((prev) => !prev);

  useEffect(() => {
    setPasswordOld("");
    setPasswordNew("");
    setConfirmPassword("");
    setInvalidConfirmPassword({ text: "รหัสผ่านไม่ตรงกัน", status: false });
    setIsUpdateSubmit(false);
  }, [modalPassword]);

  useEffect(() => {
    setDisplayName(context?.displayName as string);
    setUsername(context?.username as string);
  }, [modalInformation]);

  useEffect(() => {
    if (passwordNew.trim() === confirmPassword.trim()) {
      setInvalidConfirmPassword({
        text: "รหัสผ่านไม่ตรงกัน",
        status: false,
      });
    }
  }, [passwordNew, confirmPassword]);

  // ฟังชันก์ทำงานเมื่อกดยืนยันการเปลี่ยนรหัสผ่าน
  const clickUpdatePassword = async () => {
    setIsUpdateSubmit(true);
    if (!passwordOld.trim() || !passwordNew.trim() || !confirmPassword.trim()) {
      return;
    }

    if (passwordNew.trim() !== confirmPassword.trim()) {
      setInvalidConfirmPassword({
        text: "รหัสผ่านไม่ตรงกัน",
        status: true,
      });
      return;
    }

    try {
      const body = {
        password_old: passwordOld.trim(),
        password_new: passwordNew.trim(),
      };
      setModalPassword(false);
      setReload(true);
      await axiosExtra("/auth/password", "post", body, true);
      
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
        console.log(error);
      }
    }
  };

  // ฟังชันก์ทำงานเมื่อกดยืนยันการเปลี่ยนแปลงข้อมูล
  const clickUpdateInformation = async () => {
    if (!displayName.trim() || !username.trim()) {
      return;
    }

    if (
      displayName.trim() === context?.displayName &&
      username.trim() === context.username
    ) {
      setModalInformation(false);
      return;
    }

    try {
      const body = {
        displayName,
        username,
      };

      setReload(true);
      await axiosExtra("/users", "patch", body, true);
      setReload(false);

      setModalInformation(false);
      toastSuccess("อัพเดทข้อมูลผู้ใช้งานเรียบร้อย");
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      setModalInformation(false);
      setReload(false);

      if (isAxiosError(error)) {
        const data: ErrorResponse = error.response?.data;

        if (Array.isArray(data.message)) {
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        } else if (data.message === "displayName is repeated") {
          toastError("ชื่อที่แสดงในเว็บไซต์ถูกใช้งานแล้ว");
        } else if (data.message === "username is repeated") {
          toastError("ชื่อผู้ใช้งานถูกใช้งานแล้ว");
        } else {
          toastError("เกิดข้อผิดพลาดในการทำรายการ");
        }
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

        <div className=" mt-8 flex flex-col items-center">
          <div className="mb-8">
            <img src={avatar} alt="avatar" className="max-w-[300px] w-full" />
          </div>

          {context?.provider === "password" ? (
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
          )}

          <div className=" flex flex-col gap-y-2 max-w-md w-full mb-4">
            <label className="text-xl">รายการบอร์ดเกมที่เคยประเมิน</label>
            <BoardgameListEvaluted title="เกมยิงม้า" status={4} />
            <BoardgameListEvaluted title="เกมหั่นผักชี" status={2} />
            <BoardgameListEvaluted title="เกมอัศวินรัตติกาล" status={1} />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-y-2 items-center telephone:flex-row justify-center gap-x-4">
          <NavLink to="/page/home" className="w-full telephone:w-[130px]">
            <Button
              title="ย้อนกลับ"
              color="bg-redrose"
              hover="bg-red-800"
              shadow="red-400"
            />
          </NavLink>
          {context?.provider === "password" ? (
            <Button
              onClick={openPasswordButton}
              title="เปลี่ยนรหัสผ่าน"
              color="bg-limegreen"
              hover="bg-green-500"
              shadow="green-400"
            />
          ) : null}
          <Button
            onClick={openInformationButton}
            title="แก้ไขข้อมูล"
            color="bg-yellow-400"
            hover="bg-yellow-500"
            shadow="yellow-400"
          />
        </div>

        <Modal show={modalPassword} onClose={() => closePasswordButton()}>
          <Modal.Header>
            <div className="text-2xl">เปลี่ยนรหัสผ่าน</div>
          </Modal.Header>
          <Modal.Body>
            <form>
              <InputOnModalPassword
                type="password"
                title="รหัสผ่านเดิม"
                value={passwordOld}
                onInput={setPasswordOld}
                isSubmit={isUpdateSubmit}
                text="โปรดกรอกรหัสผ่านเดิม"
              />
              <InputOnModalPassword
                type="password"
                title="รหัสผ่านใหม่"
                value={passwordNew}
                onInput={setPasswordNew}
                isSubmit={isUpdateSubmit}
                text="โปรดกรอกรหัสผ่านใหม่"
              />
              <InputOnModalPassword
                type="password"
                title="ยืนยันรหัสผ่านใหม่"
                value={confirmPassword}
                onInput={setConfirmPassword}
                isSubmit={isUpdateSubmit}
                text="โปรดยืนยันรหัสผ่าน"
                invalidConfirmPassword={invalidConfirmPassword}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={clickUpdatePassword}
              className="w-20 rounded-md text-white bg-limegreen hover:bg-green-500 focus:ring-1 focus:border-green-400 focus:outline-none focus:ring-green-400 p-2 transition duration-150 ease-in"
            >
              ยืนยัน
            </button>
            <button
              onClick={() => closePasswordButton()}
              className="w-20 rounded-md text-white bg-redrose hover:bg-red-800 focus:ring-1 focus:border-red-600 focus:outline-none focus:ring-red-600 p-2 transition duration-150 ease-in"
            >
              ยกเลิก
            </button>
          </Modal.Footer>
        </Modal>

        <Modal show={modalInformation} onClose={() => closeInformationButton()}>
          <Modal.Header>
            <div className="text-2xl">แก้ไขข้อมูลผู้ใช้งาน</div>
          </Modal.Header>
          <Modal.Body>
            <form>
              {context?.provider === "password" ? (
                <div>
                  <InputOnModalInformation
                    type="text"
                    title="ชื่อที่แสดงในเว็บไซต์"
                    value={displayName}
                    text="โปรดกรอกชื่อที่แสดงในเว็บไซต์"
                    onInput={setDisplayName}
                  />
                  <InputOnModalInformation
                    type="text"
                    title="ชื่อผู้ใช้งาน"
                    value={username}
                    text="โปรดกรอกชื่อผู้ใช้งาน"
                    onInput={setUsername}
                  />
                </div>
              ) : null}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => clickUpdateInformation()}
              className="w-20 rounded-md text-white bg-limegreen hover:bg-green-500 focus:ring-1 focus:border-green-400 focus:outline-none focus:ring-green-400 p-2 transition duration-150 ease-in"
            >
              ยืนยัน
            </button>
            <button
              onClick={() => closeInformationButton()}
              className="w-20 rounded-md text-white bg-redrose hover:bg-red-800 focus:ring-1 focus:border-red-600 focus:outline-none focus:ring-red-600 p-2 transition duration-150 ease-in"
            >
              ยกเลิก
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer />
    </main>
  );
}

export default Profile;
