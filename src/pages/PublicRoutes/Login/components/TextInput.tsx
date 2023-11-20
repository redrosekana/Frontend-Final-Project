import { TextInputProps } from "../types/InputTypes";

function LoginTextInput({ type, placeholder, value, onInput }: TextInputProps) {
  return (
    <input
      className="w-full rounded-lg p-3 text-md outline-none bg-slate-50 border-slate-300 focus:border-blue-600 focus:ring-1"
      type={type}
      placeholder={placeholder}
      value={value}
      onInput={onInput}
    />
  );
}

export default LoginTextInput;
