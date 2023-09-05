import ChatAppHoverButton from "./ChatAppHoverButton.tsx";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import { useSetRecoilState } from "recoil";
import chatAppErrorState from "../state/ChatAppErrorState.ts";
import { Dispatch, SetStateAction } from "react";

type Props = {
  userEmail: string;
  friendEmail: string;
  setIsFriend: Dispatch<SetStateAction<boolean | null>>;
};

function ChatAppFriendAddButton({
  userEmail,
  friendEmail,
  setIsFriend,
}: Props) {
  const setError = useSetRecoilState(chatAppErrorState);
  return (
    <ChatAppHoverButton
      Icon={PersonAddAlt1Icon}
      text="추가"
      onClick={() => {
        console.dir(friendEmail);
        requestDeprecated("POST", `/chats/friends`, {
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

export default ChatAppFriendAddButton;
