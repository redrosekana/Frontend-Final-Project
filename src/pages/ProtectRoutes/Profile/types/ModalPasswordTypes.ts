// types
import { FormatCheckConfirmPassword } from "./ProfileTypes";

interface FormChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  setOldPassword: React.Dispatch<React.SetStateAction<string>>;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmNewPassword: React.Dispatch<React.SetStateAction<string>>;
}

export interface ModalpasswordProps {
  showModal: boolean;
  onClose: () => void;
  onChangePassword: () => void;
  form: FormChangePassword;
  isSubmit: boolean;
  checkConfirmPassword: FormatCheckConfirmPassword;
}
