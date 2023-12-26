// types
import { CheckListTypes } from "../types/CheckListTypes";

const CheckList = ({ title, icon, onClick, checked }: CheckListTypes) => {
  return (
    <div className="flex justify-center">
      <div
        onClick={onClick}
        className={`w-32 h-32 border shadow-md ${
          checked ? "bg-slate-200" : "bg-slate-50"
        } rounded-lg flex justify-center items-center cursor-pointer transition-all duration-100 ease-in hover:translate-x-[2px] hover:translate-y-[1px]`}
      >
        <div className="flex flex-col items-center">
          <img src={icon} className="w-10 h-10" />
          <div className="mt-1">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckList;
