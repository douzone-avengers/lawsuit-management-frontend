import { atom } from "recoil";
import { SearchUserDetailByEmail } from "../type/ResponseType.ts";

type ChatAppPersonInfoType =
  | {
      state: "Init";
    }
  | {
      state: "Ready";
      targetEmail: string;
    }
  | {
      state: "Loading";
    }
  | ({
      state: "Complete";
    } & (
      | {
          result: "Success";
          value: SearchUserDetailByEmail;
        }
      | { result: "Failure"; errMsg: string }
    ));

const chatAppPersonInfoState = atom<ChatAppPersonInfoType>({
  key: "chatAppPersonInfoState",
  default: {
    state: "Init",
  },
});

export default chatAppPersonInfoState;
