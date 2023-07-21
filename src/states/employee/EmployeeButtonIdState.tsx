import { atom } from "recoil";

const employeeButtonIdState = atom({
  key: "employeeButtonIdState",
  default: -1,
});

export default employeeButtonIdState;
