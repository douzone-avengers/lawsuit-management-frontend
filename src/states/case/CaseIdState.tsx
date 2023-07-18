import { atom } from "recoil";

const caseIdState = atom<number | null>({
  key: "caseIdState",
  default: null,
});

export default caseIdState;
