import React from "react";

// types
import { InputOnModalPasswordProps } from "../types/InputOnModalPasswordTypes";

const InputOnModalPassword = ({
  title,
  type,
  text,
  value,
  isSubmit,
  onInput,
  checkConfirmPassword,
}: InputOnModalPasswordProps) => {
  return (
    <div className="mb-3">
      <label className="block mb-2 text-lg font-medium text-gray-900">
        {title}
      </label>
      <input
        type={type}
        value={value}
        onInput={(ev: React.FormEvent<HTMLInputElement>) =>
          onInput(ev.currentTarget.value)
        }
        className="bg-slate-50 border border-gray-300 text-gray-700 text-base rounded-lg focus:ring-blue-700 focus:border-blue-700 w-full p-3"
      />
      {isSubmit && !value ? (
        <div className="text-red-800 mt-1">{text}</div>
      ) : null}
      {isSubmit && checkConfirmPassword?.status ? (
        <div className="text-red-800 mt-1">{checkConfirmPassword?.text}</div>
      ) : null}
    </div>
  );
};

export default InputOnModalPassword;
