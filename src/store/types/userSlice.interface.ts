export interface UserState {
  displayName?: string;
  username?: string;
  email?: string;
  urlAvatar?: string;
  provider?: string;
  ownerParty?: MemberParty;
  memberParty?: OwnerParty;
  scoring?: Scoring;
}

interface MemberParty {
  _id: string;
  name: string;
  limit: number;
  category: string[];
  duration: number;
  place: string;
  description: string;
  countMember: number;
  owner: Owner;
  member: Member[];
}

interface OwnerParty {
  _id: string;
  name: string;
  limit: number;
  category: string[];
  duration: number;
  place: string;
  description: string;
  countMember: number;
  owner: Owner;
  member: Member[];
}

interface Owner {
  _id: string;
  displayName: string;
  email: string;
  urlAvatar: string;
}

interface Member extends Owner {}

interface Scoring {
  scoreEntries: ScoreEntries[];
}

interface ScoreEntries {
  name: string;
  score: number;
}
