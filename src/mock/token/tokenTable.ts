export type TokenData = {
  id: number;
  memberId: number;
  refreshToken: string;
};

const tokenTable: TokenData[] = [];

export default tokenTable;
