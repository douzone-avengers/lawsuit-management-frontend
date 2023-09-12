import { atom } from "recoil";

const downPaymentBankState = atom<string>({
  key: "downPaymentBankState",
  default: "",
});

export default downPaymentBankState;
