import { useRecoilState } from "recoil";
import chatAppChatMessageState from "../state/ChatAppChatMessageState.ts";
import { useState } from "react";

function ChatAppChatMessageInput() {
  const [borderColor, setBorderColor] = useState("lightgray");
  const [message, setMessage] = useRecoilState(chatAppChatMessageState);
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
    />
  );
}

export default ChatAppChatMessageInput;
