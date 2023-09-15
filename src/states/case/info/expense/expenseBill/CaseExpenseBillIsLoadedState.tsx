import { atom } from "recoil";

const caseExpenseBillIsLoadedState = atom<boolean>({
  key: "caseExpenseBillIsLoadedState",
  default: false,
});

export default caseExpenseBillIsLoadedState;
