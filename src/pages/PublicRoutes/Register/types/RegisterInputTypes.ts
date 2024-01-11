import { Path, UseFormRegister } from "react-hook-form";

// types
import { FormRegister } from "./RegisterTypes";

export interface RegisterInputProps {
  label: string;
  type: string;
  name: Path<FormRegister>;
  register: UseFormRegister<FormRegister>;
  required: true;
  pattern: RegExp;
  validate?: (value: any) => void;
}
