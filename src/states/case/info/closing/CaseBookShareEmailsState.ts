import { atom } from "recoil";

const caseBookShareEmailsState = atom<string[]>({
  key: "caseBookShareEmails",
  default: [],
});

export default caseBookShareEmailsState;
