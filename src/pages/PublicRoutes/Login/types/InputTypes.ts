import { UseFormRegister, Path } from "react-hook-form";

// types
import { FormLoginTypes } from "./LoginTypes";

export interface TextInputProps {
  type: string;
  placeholder: string;
  name: Path<FormLoginTypes>;
  register: UseFormRegister<FormLoginTypes>;
  required: boolean;
}
