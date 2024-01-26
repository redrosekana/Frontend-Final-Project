import { BoardgameListEvalutedProps } from "../types/BoardgameListEvalutedTypes";

const BoardgameListEvaluted = ({
  name,
  score,
  onClickRemoveScoring,
}: BoardgameListEvalutedProps) => {
  const ACTION = ["sad.svg", "haha.svg", "lover.svg"];

  const scoreAction = () => {
    if (score >= 0 && score <= 3) {
      return ACTION[0];
    } else if (score >= 4 && score <= 7) {
      return ACTION[1];
    } else {
      return ACTION[2];
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center mt-2">
      <div className="w-full sm:w-8/12 text-center sm:text-start">{name}</div>
      <div className="w-full sm:w-3/12 flex justify-center sm:justify-center items-center gap-x-2 mt-2 sm:mt-0">
        <img src={`/icons/${scoreAction()}`} className="w-10" />
        <div className="flex gap-x-2">
          <p>{score}</p>
          <p>คะแนน</p>
        </div>
      </div>
      <div className="flex-grow text-center mt-2 sm:mt-0">
        <button
          onClick={() => onClickRemoveScoring(name)}
          className=" bg-gray-100 py-1 px-2 rounded text-gray-500"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default BoardgameListEvaluted;
