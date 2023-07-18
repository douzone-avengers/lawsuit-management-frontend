import { atom } from "recoil";

type SubNavigationBarType = "client" | "caseClient" | "case";

const subNavigationBarTypeState = atom<SubNavigationBarType>({
  key: "subNavigationBarTypeState",
  default: "client",
});

export default subNavigationBarTypeState;
