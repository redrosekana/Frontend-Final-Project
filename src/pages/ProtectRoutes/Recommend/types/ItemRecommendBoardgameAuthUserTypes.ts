import { ScoreEntrieTypes } from "./RecommendStepThreeTypes";

export interface ItemRecommendBoardgameAuthUserProps {
  id: string;
  name: string;
  minplayers: number;
  maxplayers: number;
  minage: number;
  playingtime: number;
  yearpublished: number;
  description: string;
  image: string;
  weight: number;
  index: number;
  scoreEntries: ScoreEntrieTypes[];
  setOpenPostScoreModel: React.Dispatch<React.SetStateAction<boolean>>;
  setBoardgameName: React.Dispatch<React.SetStateAction<string>>;
}
