import { atom } from "recoil";

export type CaseReceptionRowType = {
  id: number;
  isDone: boolean;
  receptionType: string;
  contents: string;
  receivedAt: string;
  deadline: string;
};

const caseReceptionsState = atom<
  (CaseReceptionRowType & { editable: boolean })[]
>({
  key: "caseReceptionsState",
  default: [],
});

export default caseReceptionsState;
