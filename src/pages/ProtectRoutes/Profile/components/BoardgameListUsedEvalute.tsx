import { BoardgameListEvalutedProps } from "../types/BoardgameListEvalutedTypes";

const BoardgameListEvaluted = ({ name, score }: BoardgameListEvalutedProps) => {
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
    <div className="flex justify-center items-center">
      <div className="text-lg flex-grow">{name}</div>
      <div className="w-21 flex gap-x-1">
        <img src={`/icons/${scoreAction()}`} className="w-8" />
        <div className="flex flex-col items-center">
          <p>{score}</p>
          <p>คะแนน</p>
        </div>
      </div>
    </div>
  );
};

export default BoardgameListEvaluted;
