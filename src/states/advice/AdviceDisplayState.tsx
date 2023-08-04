import { atom } from "recoil";

const adviceDisplayState = atom<number>({
  key: "adviceDisplayIdState",
  default: 0,
});

export default adviceDisplayState;
