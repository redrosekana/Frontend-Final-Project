export interface ModalAvatarProps {
  showModal: boolean;
  onClose: () => void;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  clickUpdateAvtar: () => void;
  closeAvatarButton: () => void;
}
