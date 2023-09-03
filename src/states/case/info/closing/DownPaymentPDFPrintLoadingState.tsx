import { atom } from "recoil";

const downPaymentPDFPrintLoadingState = atom<"none" | "loading" | "complete">({
  key: "downPaymentPDFPrintLoadingState",
  default: "none",
});

export default downPaymentPDFPrintLoadingState;
