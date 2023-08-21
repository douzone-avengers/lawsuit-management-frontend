export type LawsuitType = "형사" | "민사";

export type LawsuitInfo = {
  id: number;
  lawsuitType: LawsuitType;
  name: string;
  courtId: number;
  commissionFee: number;
  contingentFee: number;
  lawsuitStatus: string;
  lawsuitNum: string;
  result: string;
  judgementDate: Date;
  createdAt: Date;
  updatedAt: Date;
};
