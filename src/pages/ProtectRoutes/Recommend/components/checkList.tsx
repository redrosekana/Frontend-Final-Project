import { Tooltip } from "flowbite-react";

// types
import { CheckListTypes } from "../types/CheckListTypes";

const CheckList = ({
  title,
  icon,
  checked,
  onClick,
  checkTooltip,
}: CheckListTypes) => {
  if (typeof icon === "string") {
  }

  if (checkTooltip) {
    return (
      <Tooltip content={checkTooltip}>
        <div className="flex justify-center">
          <div
            onClick={onClick}
            className={`w-32 h-32 border shadow-md ${
              checked ? "bg-slate-300" : "bg-slate-50"
            } rounded-lg flex justify-center items-center cursor-pointer transition-all duration-100 ease-in hover:translate-x-[2px] hover:translate-y-[1px]`}
          >
            <div className="flex flex-col items-center">
              {typeof icon === "string" ? (
                <img src={icon} className="w-10 h-10" />
              ) : (
                <div className="w-10 h-10 text-4xl flex justify-center item-center">
                  {icon}
                </div>
              )}
              <div className="mt-1">{title}</div>
            </div>
          </div>
        </div>
      </Tooltip>
    );
  } else {
    return (
      <div className="flex justify-center">
        <div
          onClick={onClick}
          className={`w-32 h-32 border shadow-md ${
            checked ? "bg-slate-300" : "bg-slate-50"
          } rounded-lg flex justify-center items-center cursor-pointer transition-all duration-100 ease-in hover:translate-x-[2px] hover:translate-y-[1px]`}
        >
          <div className="flex flex-col items-center">
            {typeof icon === "string" ? (
              <img src={icon} className="w-10 h-10" />
            ) : (
              <div className="w-10 h-10 text-4xl flex justify-center item-center">
                {icon}
              </div>
            )}
            <div className="mt-1">{title}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default CheckList;
