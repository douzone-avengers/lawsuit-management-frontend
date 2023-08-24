import { atom } from "recoil";

const flagState = atom<boolean>({
  key: "flagState",
  default: false,
});

export default flagState;
