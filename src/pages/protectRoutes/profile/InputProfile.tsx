interface InputProfileProps {
  title: string;
  type: string;
  value: string;
}

const InputProfile = ({ title, type, value }: InputProfileProps) => {
  return (
    <div className="flex flex-col gap-y-2 max-w-md w-full mx-auto mb-4">
      <label className="text-xl">{title}</label>
      <input
        type={type}
        disabled={true}
        value={value}
        className="max-w-lg w-full rounded-md border-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-400"
      />
    </div>
  );
};

export default InputProfile;
