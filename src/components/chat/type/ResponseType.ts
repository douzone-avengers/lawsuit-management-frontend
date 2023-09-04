type BasicPersonInfo = {
  id: number;
  email: string;
  name: string;
  hierarchy: string;
};

type BasicLawsuitInfo = {
  id: number;
  type: string;
  num: string;
  name: string;
};

export type SearchUserByEmail = BasicPersonInfo | null;

export type SearchUserDetailByEmail = BasicPersonInfo & {
  lawsuits: BasicLawsuitInfo[];
};

export type SearchFriendsByEmail = BasicPersonInfo[];
