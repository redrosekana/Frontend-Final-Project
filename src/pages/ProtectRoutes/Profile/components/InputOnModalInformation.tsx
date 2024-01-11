import { InputOnModalInformationProps } from "../types/InputOnModalInformationTypes";

const InputOnModalInformation = ({
  title,
  type,
  value,
  text,
  onInput,
}: InputOnModalInformationProps) => {
  return (
    <div className="mb-3">
      <label className="block mb-2 text-lg font-medium text-gray-900">
        {title}
      </label>
      <input
        value={value}
        type={type}
        onInput={(ev) => onInput(ev.currentTarget.value)}
        className="w-full rounded-md p-3 text-lg text-gray-700 outline-none bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-1"
      />
      {!value ? <div className="text-red-800 mt-1">{text}</div> : null}
    </div>
  );
};

export default InputOnModalInformation;
