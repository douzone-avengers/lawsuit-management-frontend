export type LawsuitType = "형사" | "민사";
export type LawsuitStatus = "등록" | "진행" | "종결";

export type LawsuitInfo = {
  id: number;
  lawsuitType: LawsuitType;
  name: string;
  courtId: number;
  commissionFee: number;
  contingentFee: number;
  lawsuitStatus: LawsuitStatus;
  lawsuitNum: string;
  result: string;
  judgementDate: Date;
  createdAt: Date;
  updatedAt: Date;
};
