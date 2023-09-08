import SendIcon from "@mui/icons-material/Send";
import { useRecoilState, useRecoilValue } from "recoil";
import chatAppChatMessageState from "../state/ChatAppChatMessageState.ts";
import socket from "../socket.ts";
import userState from "../../../states/user/UserState.ts";

type Props = {
  roomId: number;
};

function ChatAppChatMessageSendButton({ roomId }: Props) {
  const user = useRecoilValue(userState);
  const [message, setMessage] = useRecoilState(chatAppChatMessageState);

  const handleSend = () => {
    if (user) {
      socket.emit("send-message", {
        roomId,
        senderId: user.id,
        content: message,
      });
    }
    setMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 64,
        color: "white",
        background: "#1976D2",
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        cursor: "pointer",
      }}
      onClick={handleSend}
    >
      <SendIcon />
    </div>
  );
}

export default ChatAppChatMessageSendButton;
