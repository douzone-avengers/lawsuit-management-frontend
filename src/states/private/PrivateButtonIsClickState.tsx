import { atom } from "recoil";

const privateButtonIsClickState = atom({
  key: "privateButtonIsClickState",
  default: false,
});

export default privateButtonIsClickState;
