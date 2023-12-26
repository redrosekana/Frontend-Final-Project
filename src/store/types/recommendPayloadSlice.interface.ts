export interface CategoryState {
  index: number;
  value: string;
}

export interface RecommendPayloadState {
  players: string;
  time: string;
  weight: string;
  category: CategoryState[];
}
