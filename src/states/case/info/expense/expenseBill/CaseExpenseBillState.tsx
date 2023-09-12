import { atom } from "recoil";

export type CaseExpenseBillRowType = {
  id: number;
  showFileName: string;
  originFileName: string;
  path: string;
  extension: string;
};

const caseExpenseBillState = atom<
  (CaseExpenseBillRowType & { editable: boolean })[]
>({
  key: "caseExpenseBillState",
  default: [],
});

export default caseExpenseBillState;
