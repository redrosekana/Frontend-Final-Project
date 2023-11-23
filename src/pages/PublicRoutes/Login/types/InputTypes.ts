import { UseFormRegister, Path } from "react-hook-form";

// types
import { FormLogin } from "./LoginTypes";

export interface TextInputProps {
  type: string;
  placeholder: string;
  name: Path<FormLogin>;
  register: UseFormRegister<FormLogin>;
  required: boolean;
}
