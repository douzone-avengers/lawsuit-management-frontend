import { CSSProperties, useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import * as dayjs from "dayjs";

type Props = {
  roomName: string;
  recentMsg: string;
  recentMsgTime: string;
  style?: CSSProperties;
  hover?: boolean;
  onClick?: () => void;
};

function ChatAppRoomItem({
  roomName,
  recentMsg,
  recentMsgTime,
  style,
  onClick,
  hover = false,
}: Props) {
  const [background, setBackground] = useState("white");
  const recentDayjs = dayjs(recentMsgTime);
  const recentContent = `${recentDayjs.year()}년 ${
    recentDayjs.month() + 1
  }월 ${recentDayjs.date()}일`;
  const recentContent2 = `${recentDayjs.hour()}시 ${recentDayjs.minute()}분`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
        cursor: hover ? "pointer" : "",
        background,
        ...style,
      }}
      onClick={onClick ? onClick : undefined}
      onMouseOver={() => {
        if (hover) {
          setBackground("#1976D210");
        }
      }}
      onMouseLeave={() => {
        if (hover) {
          setBackground("white");
        }
      }}
    >
      <div
        style={{
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1976D2",
          width: 48,
          height: 48,
        }}
      >
        <ChatBubbleIcon sx={{ color: "white", width: 32, height: 32 }} />
      </div>
      <div
        style={{
          display: "flex",
          width: 180,
          flexDirection: "column",
          paddingLeft: 10,
        }}
      >
        <div>
          <div
            style={{
              height: "100%",
              width: "100%",
              fontSize: 16,
            }}
          >
            {roomName}
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              fontSize: 14,
              paddingLeft: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {recentMsg}
          </div>
        </div>
      </div>
      <div
        style={{
          width: 120,
          marginLeft: 15,
          fontSize: 12,
          overflow: "hidden",
        }}
      >
        <div>{recentContent}</div>
        <div>{recentContent2}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 15,
          width: 64,
          height: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#1976D2",
            color: "white",
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            fontSize: 12,
          }}
        >
          TODO
        </div>
      </div>
    </div>
  );
}

export default ChatAppRoomItem;
