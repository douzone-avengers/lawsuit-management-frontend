import { atom } from "recoil";

export type CaseReceptionType = {
  id: number;
  isDone: boolean;
  receptionType: string;
  contents: string;
  receivedAt: string;
  deadline: string;
};

const caseReceptionsState = atom<CaseReceptionType[]>({
  key: "caseReceptionsState",
  default: [],
});

export default caseReceptionsState;
