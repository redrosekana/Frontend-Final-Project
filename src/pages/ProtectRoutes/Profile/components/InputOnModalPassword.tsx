import { InputOnModalPasswordProps } from "../types/InputOnModalPasswordTypes";

const InputOnModalPassword = ({
  title,
  type,
  value,
  text,
  isSubmit,
  onInput,
  invalidConfirmPassword,
}: InputOnModalPasswordProps) => {
  return (
    <div className="mb-3">
      <label className="block mb-2 text-lg font-medium text-gray-900">
        {title}
      </label>
      <input
        value={value}
        type={type}
        onInput={(ev) => onInput(ev.currentTarget.value)}
        className="bg-slate-50 border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-blue-700 focus:border-blue-700 w-full p-3"
      />
      {isSubmit && !value ? (
        <div className="text-red-800 mt-1">{text}</div>
      ) : null}
      {isSubmit && invalidConfirmPassword?.status ? (
        <div className="text-red-800 mt-1">{invalidConfirmPassword?.text}</div>
      ) : null}
    </div>
  );
};

export default InputOnModalPassword;
