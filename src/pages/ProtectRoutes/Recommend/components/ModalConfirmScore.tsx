import { Modal } from "flowbite-react";

// types
import { ModalConfirmScoreProps } from "../types/ModalConfirmScoreTypes";

const ModalConfirmScore = ({
  openConfirmScoreModal,
  scoreEntries,
  setOpenConfirmScoreModel,
  setScoreEntries,
  confirmScore,
}: ModalConfirmScoreProps) => {
  const deleteEntrie = (name: string) => {
    setScoreEntries((prev) => {
      return prev.filter((entrie) => entrie.name !== name);
    });
  };

  return (
    <Modal
      show={openConfirmScoreModal}
      onClose={() => setOpenConfirmScoreModel(false)}
    >
      <Modal.Header>ยืนยันการให้คะแนนบอร์ดเกม</Modal.Header>
      <Modal.Body>
        <div>
          <div className="max-w-lg w-full mx-auto text-lg">
            {scoreEntries.map((entrie, index) => (
              <div
                key={index}
                className="mb-4 sm:mb-2 flex flex-col items-center sm:flex-row"
              >
                <div className="sm:basis-96 text-center sm:text-start">
                  {index + 1}. {entrie.name}
                </div>

                <div className="flex justify-between gap-x-2 sm:flex-grow">
                  <div>{entrie.score} คะแนน </div>
                  <div className="flex justify-center items-center">
                    <i
                      className="fa-solid fa-xmark cursor-pointer bg-slate-200 p-1 rounded-md"
                      onClick={() => deleteEntrie(entrie.name)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <button
          onClick={confirmScore}
          className="w-20 rounded-md text-white bg-limegreen hover:bg-green-500 focus:ring-1 focus:border-green-400 focus:outline-none focus:ring-green-400 p-2 transition duration-150 ease-in"
        >
          ให้คะแนน
        </button>
        <button
          onClick={() => setOpenConfirmScoreModel(false)}
          className="w-20 rounded-md text-white bg-redrose hover:bg-red-800 focus:ring-1 focus:border-red-600 focus:outline-none focus:ring-red-600 p-2 transition duration-150 ease-in"
        >
          ยกเลิก
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmScore;
