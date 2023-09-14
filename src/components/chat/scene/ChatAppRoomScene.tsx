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

function numToDateStr(str: string): number {
  if (str === "") {
    return 0;
  }
  const [ymd, hms] = str.split(" ");
  const [year, month, date] = ymd
    .split("-")
    .map((item) => Number.parseInt(item));
  const [hour, minute, second] = hms
    .split(":")
    .map((item) => Number.parseInt(item));
  return new Date(year, month, date, hour, minute, second).valueOf();
}

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

  const orderedRoomsByRecnetMessage = [...rooms].sort(
    (a, b) =>
      numToDateStr(b.recentMessage?.createdAt ?? "") -
      numToDateStr(a.recentMessage?.createdAt ?? ""),
  );

  return (
    <>
      <ChatAppPlainHeader
        containerStyle={{ paddingLeft: 20 }}
        left={<ChatAppHeaderTitle>채팅</ChatAppHeaderTitle>}
      />
      <ChatAppBodyContainer
        style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}
      >
        {orderedRoomsByRecnetMessage.map((item) => (
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
