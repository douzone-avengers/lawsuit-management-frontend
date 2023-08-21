import { atom } from "recoil";

const validatedEmployeeKeyState = atom<string>({
  key: "validatedEmployeeKeyState",
  default: "",
});

export default validatedEmployeeKeyState;
