interface InputOnModalInformationProps {
  title: string;
  type: string;
  value: string;
  text: string;
  onInput: React.Dispatch<React.SetStateAction<string>>;
}

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
        className="bg-slate-50 border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-blue-700 focus:border-blue-700 w-full p-3"
      />
      {!value ? <div className="text-red-800 mt-1">{text}</div> : null}
    </div>
  );
};

export default InputOnModalInformation;
