import { atom } from "recoil";

type PersonInfo = { id: number; name: string; email: string };

type LawsuitType = {
  lawsuitId: number;
  lawsuitNum: string;
  lawsuitName: string;
  lawsuitType: string;
  lawsuitCommissionFee: number;
  lawsuitContingentFee: number;
  lawsuitStatus: string;
  courtName: string;
};

export type CaseInfoType = {
  lawsuit: LawsuitType;
  employees: PersonInfo[];
  clients: PersonInfo[];
};

const caseInfoState = atom<CaseInfoType | null>({
  key: "caseInfoState",
  default: null,
});

export default caseInfoState;
