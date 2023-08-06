import { atom } from "recoil";
import { ValidatedClientInfo } from "../../components/join/type/ValidatedClientInfo";

const validatedClientState = atom<ValidatedClientInfo | null>({
  key: "validatedClientState",
  default: null,
});

export default validatedClientState;
