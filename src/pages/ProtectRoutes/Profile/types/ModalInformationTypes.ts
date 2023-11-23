interface FormChangeInformation {
  displayName: string;
  username: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export interface ModalInformationProps {
  showModal: boolean;
  provider: string;
  onClose: () => void;
  onChangeInformation: () => void;
  form: FormChangeInformation;
}
