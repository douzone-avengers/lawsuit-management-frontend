import { atom } from "recoil";

const AdviceRequestTriggerState = atom<boolean>({
  key: "adviceRequestTriggerState",
  default: false,
});

export default AdviceRequestTriggerState;
