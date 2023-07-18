import { atom } from "recoil";

export const employeeIdState = atom<number | null>({
  key: "employeeIdState",
  default: null,
});
