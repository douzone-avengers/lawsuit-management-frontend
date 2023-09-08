import ChatAppHoverButton from "./ChatAppHoverButton.tsx";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import { Dispatch, SetStateAction } from "react";
import { useSetRecoilState } from "recoil";
import chatAppErrorState from "../state/ChatAppErrorState.ts";
import requestDeprecated from "../../../lib/requestDeprecated.ts";

type Props = {
  email: string;
  setIsFriend: Dispatch<SetStateAction<boolean | null>>;
};
function ChatAppFriendRemoveButton({ email, setIsFriend }: Props) {
  const setError = useSetRecoilState(chatAppErrorState);

  return (
    <ChatAppHoverButton
      Icon={PersonRemoveAlt1Icon}
      text="삭제"
      onClick={() => {
        requestDeprecated("PATCH", `/chats/friends/delete`, {
          body: {
            email: email,
          },
          onSuccess: () => {
            requestDeprecated("GET", `/chats/friends/check?email=${email}`, {
              onSuccess: (res) => {
                setIsFriend(res.data);
              },
              onFail: (e) => {
                setError({
                  msg: e.response.data.message,
                  callback: () => {},
                });
              },
            });
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

export default ChatAppFriendRemoveButton;
