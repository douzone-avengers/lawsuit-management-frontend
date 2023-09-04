import { CSSProperties, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  style?: CSSProperties;
};

function ChatAppHeaderText({ children, style }: Props) {
  return (
    <div
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default ChatAppHeaderText;
