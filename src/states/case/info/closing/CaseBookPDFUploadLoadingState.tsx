import { atom } from "recoil";

const caseBookPDFUploadLoadingState = atom<"none" | "loading" | "complete">({
  key: "caseBookPDFUploadLoadingState",
  default: "none",
});

export default caseBookPDFUploadLoadingState;
