import { Path, UseFormRegister } from "react-hook-form";

// types
import { FormResetPassword } from "./ResetPasswordTypes";

export interface ResetPasswordInputProps {
  type: string;
  name: Path<FormResetPassword>;
  register: UseFormRegister<FormResetPassword>;
  required: boolean;
  validate?: (value: any) => void;
}
