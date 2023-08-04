import { atom } from "recoil";

const lawsuitWinOrLoseButtonIdState = atom({
  key: "caseButtonIdState",
  default: -1,
});

export default lawsuitWinOrLoseButtonIdState;
