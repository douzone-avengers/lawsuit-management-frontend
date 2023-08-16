import { atom } from "recoil";

const curMemberAddressState = atom<string | undefined>({
  key: "curMemberAddressState",
  default: "",
});

export default curMemberAddressState;
