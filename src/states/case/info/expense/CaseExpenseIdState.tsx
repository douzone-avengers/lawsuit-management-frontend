import { atom } from "recoil";

const caseExpenseIdState = atom<any>({
  key: "caseExpenseIdState",
  default: null,
});

export default caseExpenseIdState;
