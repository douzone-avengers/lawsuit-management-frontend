import { atom } from "recoil";
import { CaseExpenseRowType } from "./CaseExpensesState.tsx";

const caseExpensePreviousState = atom<
  (CaseExpenseRowType & { editable: boolean; isSelected: boolean })[]
>({
  key: "caseExpensePreviousState",
  default: [],
});

export default caseExpensePreviousState;
