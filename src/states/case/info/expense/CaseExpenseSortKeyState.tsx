import { atom } from "recoil";

const caseExpenseSortKeyState = atom({
  key: "caseExpenseSortKeyState",
  default: "speningAt",
});

export default caseExpenseSortKeyState;
