import { MessageInfoType } from "../type/ResponseType.ts";
import { useRecoilValue } from "recoil";
import chatAppRoomInfoState from "../state/ChatAppRoomInfoState.ts";

type Props = {
  item: MessageInfoType;
  isClient: boolean;
};

function ChatAppMyMessageItem({ item, isClient }: Props) {
  const roomInfo = useRecoilValue(chatAppRoomInfoState);

  return roomInfo.state === "Complete" ? (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div
        style={{
          display: "flex",
          fontSize: 12,
          color: "gray",
          alignItems: "flex-end",
        }}
      >
        {item.createdAt}
      </div>
      <div style={{ marginLeft: 16 }}>
        <div
          style={{
            display: "inline-block",
            marginTop: 10,
            padding: 10,
            minWidth: 36,
            maxWidth: 240,
            minHeight: 44,
            maxHeight: 620,
            color: "white",
            background: isClient ? "gray" : "#1976D2",
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            whiteSpace: "pre-line",
            overflow: "auto",
          }}
        >
          {item.content}
        </div>
      </div>
    </div>
  ) : null;
}

export default ChatAppMyMessageItem;
