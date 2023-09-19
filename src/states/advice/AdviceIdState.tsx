import { atom } from "recoil";

const adviceIdState = atom<number | null>({
  key: "AdviceIdState",
  default: null,
});

export default adviceIdState;
