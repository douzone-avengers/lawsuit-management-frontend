import { atom } from "recoil";

export const clientIdState = atom<number | null>({
  key: "clientIdState",
  default: null,
});
