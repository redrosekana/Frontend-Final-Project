import { RegisterInputProps } from "../types/RegisterInputProps";

const RegisterInput = ({
  label,
  type,
  name,
  register,
  required,
  pattern,
  validate,
}: RegisterInputProps) => {
  const condition = {
    required,
    pattern,
  };

  if (validate) {
    Object.assign(condition, { validate });
  }

  return (
    <div className="mb-2">
      <label className="block mb-2 text-base font-medium text-gray-900">
        {label} <span className=" text-red-700">*</span>
      </label>
      <input
        type={type}
        {...register(name, condition)}
        className="w-full rounded-lg p-3 text-md outline-none bg-slate-50 border-slate-300 focus:border-blue-600 focus:ring-1"
      />
    </div>
  );
};

export default RegisterInput;
