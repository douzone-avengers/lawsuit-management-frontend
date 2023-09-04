import { CSSProperties, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  style?: CSSProperties;
};

function ChatAppBodyContainer({ children, style }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 128px)",
        overflow: "auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default ChatAppBodyContainer;
