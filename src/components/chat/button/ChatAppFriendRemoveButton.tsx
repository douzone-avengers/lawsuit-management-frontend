import ChatAppHoverButton from "./ChatAppHoverButton.tsx";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import { Dispatch, SetStateAction } from "react";
import { useSetRecoilState } from "recoil";
import chatAppErrorState from "../state/ChatAppErrorState.ts";
import requestDeprecated from "../../../lib/requestDeprecated.ts";

type Props = {
  userEmail: string;
  friendEmail: string;
  setIsFriend: Dispatch<SetStateAction<boolean | null>>;
};
function ChatAppFriendRemoveButton({
  userEmail,
  friendEmail,
  setIsFriend,
}: Props) {
  const setError = useSetRecoilState(chatAppErrorState);

  return (
    <ChatAppHoverButton
      Icon={PersonRemoveAlt1Icon}
      text="삭제"
      onClick={() => {
        console.dir(friendEmail);
        requestDeprecated("PATCH", `/chats/friends/delete`, {
          body: {
            email: friendEmail,
          },
          onSuccess: () => {
            requestDeprecated(
              "GET",
              `/chats/friends/check?user=${userEmail}&friend=${friendEmail}`,
              {
                onSuccess: (res) => {
                  setIsFriend(res.data);
                },
                onFail: (e) => {
                  setError({
                    msg: e.response.data.message,
                    callback: () => {},
                  });
                },
              },
            );
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
