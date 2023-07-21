import { atom } from "recoil";

type SubNavigationBarType =
  | "none"
  | "client"
  | "caseClient"
  | "case"
  | "employee";

const subNavigationBarTypeState = atom<SubNavigationBarType>({
  key: "subNavigationBarTypeState",
  default: "client",
});

export default subNavigationBarTypeState;
