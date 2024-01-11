export interface ModalAvatarProps {
  showModal: boolean;
  avatar: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  onClickUpdateAvtar: () => void;
}
