import { ResetPasswordInputProps } from "../types/ResetPasswordInputTypes";

function ResetPasswordInput({
  type,
  name,
  register,
  required,
  validate,
}: ResetPasswordInputProps) {
  const condition = { required };

  if (validate) Object.assign(condition, { validate });

  return (
    <input
      className="w-full rounded-lg p-3 mb-1 text-lg text-gray-700 outline-none bg-slate-50 border-slate-300 focus:border-blue-600 focus:ring-1"
      type={type}
      {...register(name, condition)}
    />
  );
}

export default ResetPasswordInput;
