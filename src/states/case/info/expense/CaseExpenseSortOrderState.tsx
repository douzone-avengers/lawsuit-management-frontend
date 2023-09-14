import { atom } from "recoil";

const caseExpenseSortOrderState = atom<"desc" | "asc">({
  key: "caseExpenseSortOrderState",
  default: "desc",
});

export default caseExpenseSortOrderState;
