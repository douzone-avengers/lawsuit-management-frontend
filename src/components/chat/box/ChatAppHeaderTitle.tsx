type Props = {
  children?: string;
};

function ChatAppHeaderTitle({ children }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: 20,
        color: "gray",
      }}
    >
      {children}
    </div>
  );
}

export default ChatAppHeaderTitle;
