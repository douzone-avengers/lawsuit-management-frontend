import { atom } from "recoil";
import { SearchUserDetailByEmailResponseType } from "../type/ResponseType.ts";

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
          value: SearchUserDetailByEmailResponseType;
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
