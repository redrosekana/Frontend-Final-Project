import { Modal } from "flowbite-react";

// types
import { ModalPostScoreProps } from "../types/ModalPostScoreTypes";

const ModalPostScore = ({
  boardgameName,
  score,
  emoji,
  openPostScoreModal,
  setScore,
  setEmoji,
  setOpenPostScoreModel,
  saveScore,
}: ModalPostScoreProps) => {
  const ACTION = ["sad.svg", "haha.svg", "lover.svg"];
  const scoreAction = (ev: React.FormEvent<HTMLInputElement>) => {
    setScore(parseInt(ev.currentTarget.value));

    let value = parseInt(ev.currentTarget.value);
    if (value >= 0 && value <= 3) {
      setEmoji(ACTION[0]);
    } else if (value >= 4 && value <= 7) {
      setEmoji(ACTION[1]);
    } else {
      setEmoji(ACTION[2]);
    }
  };

  return (
    <Modal
      show={openPostScoreModal}
      onClose={() => setOpenPostScoreModel(false)}
    >
      <Modal.Header>ให้คะแนนบอร์ดเกม {boardgameName}</Modal.Header>
      <Modal.Body>
        <div className="max-w-lg w-full mx-auto">
          <div className="text-center text-4xl flex items-center justify-center gap-x-4">
            <img src={`/icons/${emoji}`} className="w-16" />
            <p>{score} คะแนน</p>
          </div>

          <div className="flex justify-center gap-x-6 mt-6">
            <input
              type="range"
              value={score}
              onInput={scoreAction}
              min="0"
              max="10"
              className="w-full h-3 bg-gray-300 rounded-md appearance-none cursor-pointer"
            ></input>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <button
          onClick={() => saveScore(boardgameName, score)}
          className="w-20 rounded-md text-white bg-limegreen hover:bg-green-500 focus:ring-1 focus:border-green-400 focus:outline-none focus:ring-green-400 p-2 transition duration-150 ease-in"
        >
          ให้คะแนน
        </button>
        <button
          onClick={() => setOpenPostScoreModel(false)}
          className="w-20 rounded-md text-white bg-redrose hover:bg-red-800 focus:ring-1 focus:border-red-600 focus:outline-none focus:ring-red-600 p-2 transition duration-150 ease-in"
        >
          ยกเลิก
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPostScore;
