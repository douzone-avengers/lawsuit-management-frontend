import ChatAppHoverButton from "./ChatAppHoverButton.tsx";
import ForumIcon from "@mui/icons-material/Forum";
import { useRecoilValue, useSetRecoilState } from "recoil";
import chatAppSceneState from "../state/ChatAppSceneState.ts";
import chatAppRoomInfoState from "../state/ChatAppRoomInfoState.tsx";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import {
  CreateRoomResponseType,
  GetOneToOneRoomByEmailResponseType,
} from "../type/ResponseType.ts";
import chatAppErrorState from "../state/ChatAppErrorState.ts";
import userState from "../../../states/user/UserState.ts";

type Props = {
  email: string;
};

function ChatAppRoomChatButton({ email }: Props) {
  const user = useRecoilValue(userState);
  const setError = useSetRecoilState(chatAppErrorState);
  const setScene = useSetRecoilState(chatAppSceneState);
  const setRoomInfo = useSetRecoilState(chatAppRoomInfoState);
  return (
    <ChatAppHoverButton
      Icon={ForumIcon}
      text="채팅"
      onClick={() => {
        requestDeprecated("GET", `/chats/rooms/one-to-one?email=${email}`, {
          onSuccess: (res) => {
            const body: GetOneToOneRoomByEmailResponseType = res.data;
            if (!body) {
              if (!user) {
                setError({
                  msg: "유저가 존재하지 않습니다.",
                  callback: () => {},
                });
                return;
              }
              requestDeprecated("POST", "/chats/rooms", {
                body: {
                  type: "oneToOne",
                  name: null,
                  emails: [user.email, email],
                },
                onSuccess: (res) => {
                  const body = res.data as CreateRoomResponseType;
                  setRoomInfo({
                    state: "Ready",
                    value: body,
                  });
                  setScene("RoomChat");
                },
                onFail: (e) => {
                  setError({
                    msg: e.response.data.message,
                    callback: () => {},
                  });
                },
              });
              return;
            }
            setRoomInfo({
              state: "Ready",
              value: body,
            });
            setScene("RoomChat");
          },
          onFail: (e) => {
            setError({
              msg: e.response.data.message,
              callback: () => {},
            });
          },
        });
      }}
    />
  );
}

export default ChatAppRoomChatButton;
