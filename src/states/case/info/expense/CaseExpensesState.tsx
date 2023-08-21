import { atom } from "recoil";

export type CaseExpenseRowType = {
  id: number;
  speningAt: string;
  contents: string;
  amount: number;
};

const caseExpensesState = atom<(CaseExpenseRowType & { editable: boolean })[]>({
  key: "caseExpensesState",
  default: [],
});

export default caseExpensesState;
