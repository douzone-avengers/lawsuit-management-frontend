import { atom } from "recoil";

const caseBookPDFPrintLoadingState = atom<"none" | "loading" | "complete">({
  key: "caseBookPDFPrintLoadingState",
  default: "none",
});

export default caseBookPDFPrintLoadingState;
