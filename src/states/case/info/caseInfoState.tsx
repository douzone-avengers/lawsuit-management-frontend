import { atom } from "recoil";
import { LawsuitInfo } from "../../../components/case/type/LawsuitInfo.tsx";
type PersonInfo = { id: number; name: string; email: string };

export type CaseInfoType = {
  lawsuit: LawsuitInfo;
  employees: PersonInfo[];
  clients: PersonInfo[];
};

const caseInfoState = atom<CaseInfoType | null>({
  key: "caseInfoState",
  default: null,
});

export default caseInfoState;
