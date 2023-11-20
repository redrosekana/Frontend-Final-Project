import { BoardgameListEvalutedProps } from "../types/BoardgameListEvalutedTypes";

const BoardgameListEvaluted = ({
  title,
  status,
}: BoardgameListEvalutedProps) => {
  let color: string = "";
  if (status >= 4) {
    color = "bg-green-700";
  } else if (status >= 2) {
    color = "bg-green-500";
  } else {
    color = "bg-green-400";
  }

  return (
    <div className="flex justify-center items-center gap-x-10">
      <div className="text-lg flex-grow flex-shrink-0">{title}</div>
      <div>
        <div
          className={`${color} text-white rounded w-12 h-7 flex justify-center items-center`}
        >
          {status} ดาว
        </div>
      </div>
    </div>
  );
};

export default BoardgameListEvaluted;
