export interface BoardgameListEvalutedProps {
  name: string;
  score: number;
  onClickRemoveScoring: (name: string) => void;
}
