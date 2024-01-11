import { Modal } from "flowbite-react";

// types
import { ModalAvatarProps } from "../types/ModalAvatarTypes";

function ModalAvatar({
  showModal,
  avatar,
  onClose,
  setAvatar,
  onClickUpdateAvtar,
}: ModalAvatarProps) {
  return (
    <Modal show={showModal} onClose={() => onClose(false)}>
      <Modal.Header>
        <div>เลือก Avatar ที่ต้องการ</div>
      </Modal.Header>

      <Modal.Body>
        <div className="flex justify-center -mt-5">
          <div className="max-w-[230px]">
            <img src={avatar} alt="avatar" className="w-full" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-6 lg:grid-cols-12 gap-2">
          {new Array(60)
            .fill(0)
            .map((_, index) => index + 1)
            .map((num, index) => {
              return (
                <div key={index} className="flex justify-center">
                  <div
                    className="max-w-[45px] cursor-pointer"
                    onClick={() =>
                      setAvatar(
                        `https://storage.googleapis.com/boardgame-recommu/avatar-maker/avatar-${num}.svg`
                      )
                    }
                  >
                    <img
                      src={`https://storage.googleapis.com/boardgame-recommu/avatar-maker/avatar-${num}.svg`}
                      alt="avatar"
                      className="w-full"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <button
          onClick={onClickUpdateAvtar}
          className="w-20 rounded-md text-white bg-limegreen hover:bg-green-500 focus:ring-1 focus:border-green-400 focus:outline-none focus:ring-green-400 p-2 transition duration-150 ease-in"
        >
          ยืนยัน
        </button>
        <button
          onClick={() => onClose(false)}
          className="w-20 rounded-md text-white bg-redrose hover:bg-red-800 focus:ring-1 focus:border-red-600 focus:outline-none focus:ring-red-600 p-2 transition duration-150 ease-in"
        >
          ยกเลิก
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAvatar;
