import { InputProfileProps } from "../types/InputProfileTypes";

const InputProfile = ({ title, type, value }: InputProfileProps) => {
  return (
    <div className="flex flex-col mx-auto mb-4 max-w-lg">
      <label className="text-xl mb-2">{title}</label>
      <input
        type={type}
        disabled={true}
        value={value}
        className="max-w-lg rounded-md border-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-400"
      />
    </div>
  );
};

export default InputProfile;
