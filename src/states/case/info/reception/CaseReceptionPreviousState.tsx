import { atom } from "recoil";
import { CaseReceptionRowType } from "./CaseReceptionsState.tsx";

const caseReceptionPreviousState = atom<
  (CaseReceptionRowType & { editable: boolean })[]
>({
  key: "caseReceptionPreviousState",
  default: [],
});

export default caseReceptionPreviousState;
