import { CSSProperties, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  style?: CSSProperties;
};

function ChatAppHeaderContainer({ children, style }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: 64,
        borderBottom: "1px solid lightgray",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default ChatAppHeaderContainer;
