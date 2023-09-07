import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import ChatAppNavigationFooter from "../layout/ChatAppNavigationFooter.tsx";
import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppHeaderTitle from "../box/ChatAppHeaderTitle.tsx";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import chatAppRoomListState from "../state/ChatAppRoomListState.ts";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import ChatAppRoomItem from "../box/ChatAppRoomItem.tsx";

function ChatAppRoomScene() {
  const [rooms, setRooms] = useRecoilState(chatAppRoomListState);
  useEffect(() => {
    requestDeprecated("GET", "/chats/rooms", {
      onSuccess: (res) => {
        console.dir(res.data);
        setRooms(res.data);
      },
    });

    return () => {
      setRooms([]);
    };
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
            recentMsg={"TODO"}
            recentMsgTime={"TODO"}
            hover={true}
          />
        ))}
      </ChatAppBodyContainer>
      <ChatAppNavigationFooter />
    </>
  );
}

export default ChatAppRoomScene;
