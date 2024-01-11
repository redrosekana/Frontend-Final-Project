export interface RecommendBoardgameEntries {
  id: string;
  name: string;
  minplayers: number;
  maxplayers: number;
  minage: number;
  playingtime: number;
  yearpublished: number;
  description: string;
  image: string;
}

export interface FormSearchBoardgameRecommend {
  search: string;
}
