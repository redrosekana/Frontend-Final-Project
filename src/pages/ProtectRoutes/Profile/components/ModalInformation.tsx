import { Modal } from "flowbite-react";

// types
import { ModalInformationProps } from "../types/ModalInformationTypes";

// components
import InputOnModalInformation from "./InputOnModalInformation";

function ModalInformation({
  showModal,
  onClose,
  provider,
  form,
  onChangeInformation,
}: ModalInformationProps) {
  return (
    <Modal show={showModal} onClose={onClose}>
      <Modal.Header>
        <div className="text-2xl">แก้ไขข้อมูลผู้ใช้งาน</div>
      </Modal.Header>
      <Modal.Body>
        <form>
          {provider === "password" ? (
            <div>
              <InputOnModalInformation
                type="text"
                title="ชื่อที่แสดงในเว็บไซต์"
                text="โปรดกรอกชื่อที่แสดงในเว็บไซต์"
                value={form.displayName}
                onInput={form.setDisplayName}
              />
              <InputOnModalInformation
                type="text"
                title="ชื่อผู้ใช้งาน"
                text="โปรดกรอกชื่อผู้ใช้งาน"
                value={form.username}
                onInput={form.setUsername}
              />
            </div>
          ) : (
            <div>
              <InputOnModalInformation
                type="text"
                title="ชื่อที่แสดงในเว็บไซต์"
                text="โปรดกรอกชื่อที่แสดงในเว็บไซต์"
                value={form.displayName}
                onInput={form.setDisplayName}
              />
            </div>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <button
          onClick={onChangeInformation}
          className="w-20 rounded-md text-white bg-limegreen hover:bg-green-500 focus:ring-1 focus:border-green-400 focus:outline-none focus:ring-green-400 p-2 transition duration-150 ease-in"
        >
          ยืนยัน
        </button>
        <button
          onClick={onClose}
          className="w-20 rounded-md text-white bg-redrose hover:bg-red-800 focus:ring-1 focus:border-red-600 focus:outline-none focus:ring-red-600 p-2 transition duration-150 ease-in"
        >
          ยกเลิก
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalInformation;
