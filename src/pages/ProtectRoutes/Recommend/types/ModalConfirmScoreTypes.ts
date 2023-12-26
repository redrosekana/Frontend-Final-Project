import { ScoreEntrieTypes } from "./RecommendThreeTypes";

export interface ModalConfirmScoreProps {
  openConfirmScoreModal: boolean;
  scoreEntries: ScoreEntrieTypes[];
  setOpenConfirmScoreModel: React.Dispatch<React.SetStateAction<boolean>>;
  setScoreEntries: React.Dispatch<React.SetStateAction<ScoreEntrieTypes[]>>;
  confirmScore: () => void;
}
