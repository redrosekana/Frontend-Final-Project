import { RegisterInputProps } from "../types/RegisterInputProps";

const RegisterInput = ({ label, type, value, onInput }: RegisterInputProps) => {
  return (
    <div className="mb-2">
      <label className="block mb-2 text-base font-medium text-gray-900">
        {label} <span className=" text-red-700">*</span>
      </label>
      <input
        type={type}
        value={value}
        onInput={(ev) => onInput(ev.currentTarget.value)}
        className="w-full rounded-lg p-3 text-md outline-none bg-slate-50 border-slate-300 focus:border-blue-600 focus:ring-1"
      />
    </div>
  );
};

export default RegisterInput;
