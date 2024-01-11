import { Path, UseFormRegister } from "react-hook-form";

// types
import { FormSendEmailTypes } from "./EmailTypes";

export interface SendEmailInputProps {
  type: string;
  placeholder: string;
  name: Path<FormSendEmailTypes>;
  register: UseFormRegister<FormSendEmailTypes>;
  required: boolean;
  pattern: RegExp;
}
