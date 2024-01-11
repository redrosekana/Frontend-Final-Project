// types
import { FormatCheckConfirmPassword } from "./ProfileTypes";

export interface InputOnModalPasswordProps {
  type: string;
  title: string;
  text: string;
  value: string;
  isSubmit: boolean;
  onInput: React.Dispatch<React.SetStateAction<string>>;
  checkConfirmPassword?: FormatCheckConfirmPassword;
}
