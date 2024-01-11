export interface ModalInformationProps {
  showModal: boolean;
  provider: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeInformation: () => void;
  form: FormChangeInformation;
}

interface FormChangeInformation {
  displayName: string;
  username: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}
