import { atom } from "recoil";

export type CaseExpenseRowType = {
  id: number;
  speningAt: string;
  contents: string;
  amount: number;
};

const caseExpenseState = atom<(CaseExpenseRowType & { editable: boolean })[]>({
  key: "caseExpenseState",
  default: [],
});

export default caseExpenseState;
