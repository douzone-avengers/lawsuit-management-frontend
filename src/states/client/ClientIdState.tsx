import { atom } from "recoil";

const clientIdState = atom<number | null>({
  key: "clientIdState",
  default: null,
});

export default clientIdState;
