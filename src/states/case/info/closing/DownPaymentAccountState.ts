import { atom } from "recoil";

const downPaymentAccountState = atom<string>({
  key: "downPaymentAccountState",
  default: "",
});

export default downPaymentAccountState;
