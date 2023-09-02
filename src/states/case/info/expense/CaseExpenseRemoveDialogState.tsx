import { atom } from "recoil";

export type CaseExpenseRemoveDialogStateType = {
  open: boolean;
  title: string;
  message: string;
};

const caseExpenseRemoveDialogState = atom<CaseExpenseRemoveDialogStateType>({
  key: "caseExpenseRemoveDialogState",
  default: {
    open: false,
    title: "",
    message: "",
  },
});

export default caseExpenseRemoveDialogState;
