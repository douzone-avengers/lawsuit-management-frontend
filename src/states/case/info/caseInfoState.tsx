import { atom } from "recoil";
import { LawsuitData } from "../../../mock/lawsuit/lawsuitTable.ts";

type PersonInfo = { id: number; name: string; email: string };

export type CaseInfoType = {
  lawsuit: LawsuitData;
  employees: PersonInfo[];
  clients: PersonInfo[];
};

const caseInfoState = atom<CaseInfoType | null>({
  key: "caseInfoState",
  default: null,
});

export default caseInfoState;
