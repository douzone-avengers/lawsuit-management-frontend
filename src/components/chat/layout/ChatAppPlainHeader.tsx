import ChatAppHeaderContainer from "./ChatAppHeaderContainer.tsx";
import { CSSProperties, ReactNode } from "react";

type Props = {
  left?: ReactNode;
  right?: ReactNode;
  containerStyle?: CSSProperties;
};

function ChatAppPlainHeader({ left, right, containerStyle }: Props) {
  return (
    <ChatAppHeaderContainer style={containerStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            {left}
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            {right}
          </div>
        </div>
      </div>
    </ChatAppHeaderContainer>
  );
}

export default ChatAppPlainHeader;
