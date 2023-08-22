import { atom } from "recoil";

const scheduleButtonIsClickState = atom({
  key: "scheduleButtonIsClickState",
  default: false,
});

export default scheduleButtonIsClickState;
