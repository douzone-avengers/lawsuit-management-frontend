import { atom } from "recoil";

const downPaymentShareEmailsState = atom<string[]>({
  key: "downPaymentShareEmails",
  default: [],
});

export default downPaymentShareEmailsState;
