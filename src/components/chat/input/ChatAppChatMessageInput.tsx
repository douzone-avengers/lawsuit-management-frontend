import { useRecoilState, useRecoilValue } from "recoil";
import chatAppChatMessageState from "../state/ChatAppChatMessageState.ts";
import { useState } from "react";
import userState from "../../../states/user/UserState.ts";
import socket from "../socket.ts";

type Props = {
  roomId: number;
};

function ChatAppChatMessageInput({ roomId }: Props) {
  const [borderColor, setBorderColor] = useState("lightgray");
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
    <textarea
      style={{
        color: "gray",
        width: "calc(100% - 64px)",
        height: "100%",
        outline: "none",
        border: `2px solid ${borderColor}`,
        fontSize: 18,
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        paddingTop: 8,
        paddingLeft: 30,
        paddingRight: 10,
        resize: "none",
      }}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onFocus={() => setBorderColor("#1976D2")}
      onBlur={() => setBorderColor("lightgray")}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      }}
    />
  );
}

export default ChatAppChatMessageInput;
