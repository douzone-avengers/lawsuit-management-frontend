import { atom } from "recoil";

const caseTabIdState = atom<number>({
  key: "caseTabIdState",
  default: 0,
});

export default caseTabIdState;
