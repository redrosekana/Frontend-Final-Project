export interface CardPartyProps {
  _id: string;
  name: string;
  limit: number;
  category: string[];
  duration: number;
  place: string;
  countMember: number;
  owner: string;
  canJoin: boolean;
  setState: React.Dispatch<React.SetStateAction<number>>;
}
