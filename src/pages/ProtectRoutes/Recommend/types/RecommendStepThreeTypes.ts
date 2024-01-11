export interface RecommendBoardgameAuthUser {
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
}

export interface ScoreEntrieTypes {
  name: string;
  score: number;
}
