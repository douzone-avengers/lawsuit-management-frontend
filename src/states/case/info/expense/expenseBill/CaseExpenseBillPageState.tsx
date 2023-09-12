import { atom, selector } from "recoil";
import caseExpenseIdState from "../CaseExpenseIdState.tsx";

const caseExpenseBillPageState = atom({
  key: "caseExpenseBillPageState",
  default: 0,
});

export const caseExpenseBillUrlState = selector({
  key: "caseExpenseBillUrlState",
  get: ({ get }) => {
    const expenseId = get(caseExpenseIdState);
    const page = get(caseExpenseBillPageState);

    return decodeURIComponent(`/expenses/${expenseId}/bill?page=${page}`);
  },
});

export default caseExpenseBillPageState;
