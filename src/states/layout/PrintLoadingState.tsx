import { atom } from "recoil";

const printLoadingState = atom<"none" | "loading" | "complete">({
  key: "printLoadingState",
  default: "none",
});

export default printLoadingState;
