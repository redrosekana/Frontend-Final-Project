interface inputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onInput: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ label, type, id, value, onInput }: inputProps) => {
  return (
    <div className="mb-2">
      <label
        htmlFor={id}
        className="block mb-2 text-base font-medium text-gray-900"
      >
        {label} <span className=" text-red-700">*</span>
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onInput={(ev) => onInput(ev.currentTarget.value)}
        className="bg-slate-50 border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-blue-700 focus:border-blue-700 w-full p-3"
      />
    </div>
  );
};

export default Input;
