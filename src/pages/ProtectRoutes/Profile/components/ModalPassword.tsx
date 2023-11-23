import { Modal } from "flowbite-react";

// types
import { ModalpasswordProps } from "../types/ModalPasswordTypes";

// components
import InputOnModalPassword from "./InputOnModalPassword";

function ModalPassword({
  showModal,
  onClose,
  onChangePassword,
  form,
  isSubmit,
  checkConfirmPassword,
}: ModalpasswordProps) {
  return (
    <Modal show={showModal} onClose={onClose}>
      <Modal.Header>
        <div className="text-2xl">เปลี่ยนรหัสผ่าน</div>
      </Modal.Header>

      <Modal.Body>
        <InputOnModalPassword
          type="password"
          title="รหัสผ่านเดิม"
          text="โปรดกรอกรหัสผ่านเดิม"
          value={form.oldPassword}
          onInput={form.setOldPassword}
          isSubmit={isSubmit}
        />
        <InputOnModalPassword
          type="password"
          title="รหัสผ่านใหม่"
          text="โปรดกรอกรหัสผ่านใหม่"
          value={form.newPassword}
          onInput={form.setNewPassword}
          isSubmit={isSubmit}
        />
        <InputOnModalPassword
          type="password"
          title="ยืนยันรหัสผ่านใหม่"
          text="โปรดยืนยันรหัสผ่าน"
          value={form.confirmNewPassword}
          onInput={form.setConfirmNewPassword}
          isSubmit={isSubmit}
          checkConfirmPassword={checkConfirmPassword}
        />
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <button
          onClick={onChangePassword}
          className="w-20 rounded-md text-white bg-limegreen hover:bg-green-500 focus:ring-1 focus:border-green-400 focus:outline-none focus:ring-green-400 p-2 transition duration-150 ease-in"
        >
          ยืนยัน
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-20 rounded-md text-white bg-redrose hover:bg-red-800 focus:ring-1 focus:border-red-600 focus:outline-none focus:ring-red-600 p-2 transition duration-150 ease-in"
        >
          ยกเลิก
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPassword;
