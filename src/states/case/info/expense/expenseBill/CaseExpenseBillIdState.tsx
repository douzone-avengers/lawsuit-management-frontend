import { atom } from "recoil";

const caseExpenseBillIdState = atom<number | null>({
  key: "caseExpenseBillIdState",
  default: null,
});

export default caseExpenseBillIdState;
