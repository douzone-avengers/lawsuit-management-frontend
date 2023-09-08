import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import chatAppRoomInfoState from "../state/ChatAppRoomInfoState.ts";
import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import ChatAppFooterContainer from "../layout/ChatAppFooterContainer.tsx";
import ChatAppChatMessageInput from "../input/ChatAppChatMessageInput.tsx";
import chatAppChatMessageState from "../state/ChatAppChatMessageState.ts";
import ChatAppBackButton from "../button/ChatAppBackButton.tsx";
import ChatAppChatMessageSendButton from "../button/ChatAppChatMessageSendButton.tsx";
import ChatAppHeaderTitle from "../box/ChatAppHeaderTitle.tsx";
import chatAppRoomMessagesState from "../state/ChatAppRoomMessagesState.ts";
import ChatAppMessageYourItem from "../box/ChatAppYourMessageItem.tsx";
import userState from "../../../states/user/UserState.ts";
import ChatAppMyMessageItem from "../box/ChatAppMyMessageItem.tsx";
import requestDeprecated from "../../../lib/requestDeprecated.ts";

function ChatAppRoomChatScene() {
  const user = useRecoilValue(userState);
  const [roomInfo, setRoomInfo] = useRecoilState(chatAppRoomInfoState);
  const setMessage = useSetRecoilState(chatAppChatMessageState);
  const [roomTitle, setRoomTitle] = useState("");
  const [roomMessages, setRoomMessages] = useRecoilState(
    chatAppRoomMessagesState,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      setRoomInfo({ state: "Init" });
      setRoomMessages([]);
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
      requestDeprecated(
        "PATCH",
        `/chats/messages/read?room=${roomInfo.value.id}`,
        {
          onSuccess: () => {},
        },
      );
      requestDeprecated("GET", `/chats/messages?room=${roomInfo.value.id}`, {
        onSuccess: (res) => {
          setRoomMessages(res.data);
          setRoomInfo((prev) => {
            if (prev.state !== "Ready") {
              throw new Error("");
            }
            return {
              ...prev,
              state: "Loading",
            };
          });
        },
      });
    } else if (roomInfo.state === "Loading") {
      setRoomInfo((prev) => {
        console.log("loading");
        if (prev.state !== "Loading") {
          throw new Error("");
        }
        return {
          ...prev,
          state: "Complete",
        };
      });
    } else if (roomInfo.state === "Complete") {
      if (!containerRef.current) {
        return;
      }
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [roomInfo]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [roomMessages]);

  const roomId = roomInfo.state === "Complete" ? roomInfo.value.id : null;

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

      {roomId !== null ? (
        <>
          <ChatAppBodyContainer>
            <div
              ref={containerRef}
              style={{ height: "100%", overflow: "auto", padding: 20 }}
            >
              {roomMessages.map((item) =>
                user?.id === item.senderId ? (
                  <ChatAppMyMessageItem key={item.id} item={item} />
                ) : (
                  <ChatAppMessageYourItem key={item.id} item={item} />
                ),
              )}
            </div>
          </ChatAppBodyContainer>
          <ChatAppFooterContainer style={{ border: "none", height: 64 }}>
            <div
              style={{
                display: "flex",
                height: "100%",
              }}
            >
              <ChatAppChatMessageInput roomId={roomId} />
              <ChatAppChatMessageSendButton roomId={roomId} />
            </div>
          </ChatAppFooterContainer>
        </>
      ) : null}
    </>
  );
}

export default ChatAppRoomChatScene;
