type PersonInfo = {
  id: number;
  email: string;
  name: string;
  hierarchy: string;
};

export type SearchUserByEmail = PersonInfo | null;

export type SearchFriendsByEmail = PersonInfo[];
