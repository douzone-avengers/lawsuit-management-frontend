import { CSSProperties, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  style?: CSSProperties;
};

function ChatAppFooterContainer({ children, style }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: 64,
        borderTop: "1px solid lightgray",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default ChatAppFooterContainer;
