import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import chatAppRoomInfoState from "../state/ChatAppRoomInfoState.tsx";
import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import ChatAppFooterContainer from "../layout/ChatAppFooterContainer.tsx";
import ChatAppChatMessageInput from "../input/ChatAppChatMessageInput.tsx";
import chatAppChatMessageState from "../state/ChatAppChatMessageState.ts";
import ChatAppBackButton from "../button/ChatAppBackButton.tsx";
import ChatAppChatMessageSendButton from "../button/ChatAppChatMessageSendButton.tsx";
import ChatAppHeaderTitle from "../box/ChatAppHeaderTitle.tsx";

function ChatAppRoomChatScene() {
  const [roomInfo, setRoomInfo] = useRecoilState(chatAppRoomInfoState);
  const setMessage = useSetRecoilState(chatAppChatMessageState);
  const [roomTitle, setRoomTitle] = useState("");

  useEffect(() => {
    return () => {
      setRoomInfo({ state: "Init" });
      setMessage("");
    };
  }, []);

  useEffect(() => {
    if (roomInfo.state === "Init") {
    } else if (roomInfo.state === "Ready") {
      setRoomTitle(
        roomInfo.value.name ??
          roomInfo.value.users.map((item) => item.name).join(", "),
      );
    } else if (roomInfo.state === "Loading") {
    } else if (roomInfo.state === "Complete") {
    }
  }, [roomInfo]);

  return (
    <>
      <ChatAppPlainHeader
        left={
          <div style={{ display: "flex", marginLeft: 5, gap: 5 }}>
            <ChatAppBackButton />
            <ChatAppHeaderTitle>{roomTitle}</ChatAppHeaderTitle>
          </div>
        }
      />
      <ChatAppBodyContainer></ChatAppBodyContainer>
      <ChatAppFooterContainer style={{ border: "none", height: 64 }}>
        <div
          style={{
            display: "flex",
            height: "100%",
          }}
        >
          <ChatAppChatMessageInput />
          <ChatAppChatMessageSendButton />
        </div>
      </ChatAppFooterContainer>
    </>
  );
}

export default ChatAppRoomChatScene;
