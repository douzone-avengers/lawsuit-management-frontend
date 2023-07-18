import { atom } from "recoil";

const employeeIdState = atom<number | null>({
  key: "employeeIdState",
  default: null,
});

export default employeeIdState;
