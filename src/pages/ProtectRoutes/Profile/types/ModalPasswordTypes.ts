// types
import { FormatCheckConfirmPassword } from "./ProfileTypes";

export interface ModalpasswordProps {
  showModal: boolean;
  form: FormChangePassword;
  isSubmit: boolean;
  checkConfirmPassword: FormatCheckConfirmPassword;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onChangePassword: () => void;
}

interface FormChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  setOldPassword: React.Dispatch<React.SetStateAction<string>>;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmNewPassword: React.Dispatch<React.SetStateAction<string>>;
}
