import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import ChatAppNavigationFooter from "../layout/ChatAppNavigationFooter.tsx";
import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppHeaderTitle from "../box/ChatAppHeaderTitle.tsx";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import chatAppRoomListState from "../state/ChatAppRoomListState.ts";
import ChatAppRoomItem from "../box/ChatAppRoomItem.tsx";
import chatAppSceneState from "../state/ChatAppSceneState.ts";
import chatAppRoomInfoState from "../state/ChatAppRoomInfoState.ts";
import requestDeprecated from "../../../lib/requestDeprecated.ts";

function ChatAppRoomScene() {
  const setScene = useSetRecoilState(chatAppSceneState);
  const setRoomInfo = useSetRecoilState(chatAppRoomInfoState);
  const [rooms, setRooms] = useRecoilState(chatAppRoomListState);
  useEffect(() => {
    requestDeprecated("GET", "/chats/rooms", {
      onSuccess: (res) => {
        setRooms(res.data);
      },
    });
  }, []);

  return (
    <>
      <ChatAppPlainHeader
        containerStyle={{ paddingLeft: 20 }}
        left={<ChatAppHeaderTitle>채팅</ChatAppHeaderTitle>}
      />
      <ChatAppBodyContainer
        style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}
      >
        {rooms.map((item) => (
          <ChatAppRoomItem
            key={item.id}
            roomName={
              item.name ?? item.users.map((it) => it.name).join(",") ?? "???"
            }
            recentMsg={item.recentMessage?.content ?? null}
            recentMsgTime={item.recentMessage?.createdAt ?? null}
            unreadMessageCount={item.unreadMessageCount}
            hover={true}
            onClick={() => {
              setScene("RoomChat");
              setRoomInfo({
                state: "Ready",
                value: item,
              });
            }}
          />
        ))}
      </ChatAppBodyContainer>
      <ChatAppNavigationFooter />
    </>
  );
}

export default ChatAppRoomScene;
