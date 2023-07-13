import { atom } from "recoil";

export const caseIdState = atom<number | null>({
  key: "caseIdState",
  default: null,
});
