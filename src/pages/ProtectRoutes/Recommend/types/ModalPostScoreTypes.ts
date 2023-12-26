export interface ModalPostScoreProps {
  boardgameName: string;
  score: number;
  emoji: string;
  openPostScoreModal: boolean;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setEmoji: React.Dispatch<React.SetStateAction<string>>;
  setOpenPostScoreModel: React.Dispatch<React.SetStateAction<boolean>>;
  saveScore: () => void;
}
