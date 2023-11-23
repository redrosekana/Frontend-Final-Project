import { Path, UseFormRegister } from "react-hook-form";

// types
import { FormSendEmail } from "./EmailTypes";

export interface SendEmailInputProps {
  type: string;
  placeholder: string;
  name: Path<FormSendEmail>;
  register: UseFormRegister<FormSendEmail>;
  required: boolean;
  pattern: RegExp;
}
