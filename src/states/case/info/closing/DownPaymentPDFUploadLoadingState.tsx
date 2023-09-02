import { atom } from "recoil";

const downUploadPDFPrintLoadingState = atom<"none" | "loading" | "complete">({
  key: "downUploadPDFPrintLoadingState",
  default: "none",
});

export default downUploadPDFPrintLoadingState;
