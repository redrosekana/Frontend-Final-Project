export interface PartyItem {
  _id: string;
  name: string;
  limit: number;
  category: string[];
  duration: number;
  place: string;
  member: Array<unknown>;
  countMember: number;
  owner: Owner;
}

export interface Owner {
  _id: string;
  displayName: string;
  username: string;
  email: string;
  provider: string;
}
