import { atom } from "recoil";

export type CaseExpenseBIllRowType = {
  id: number;
  showFilename: string;
  originFilename: string;
  path: string;
  extension: string;
};

const caseExpenseBillState = atom<
  (CaseExpenseBIllRowType & { editable: boolean })[]
>({
  key: "caseExpenseBillState",
  default: [],
});

export default caseExpenseBillState;
