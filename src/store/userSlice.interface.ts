export interface UserState {
  displayName?: string;
  username?: string;
  email?: string;
  provider?: string;
  ownerParty?: MemberParty;
  memberParty?: OwnerParty;
}

interface MemberParty {
  _id: string;
  name: string;
  limit: number;
  category: string;
  duration: number;
  place: string;
  countMember: number;
  owner: Owner;
}

interface OwnerParty {
  _id: string;
  name: string;
  limit: number;
  category: string;
  duration: number;
  place: string;
  countMember: number;
  owner: Owner;
}

interface Owner {
  displayName: string;
  email: string;
}
