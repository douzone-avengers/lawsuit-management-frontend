type Props = {
  header: string;
  content: string;
};

function ChatAppTag({ header, content }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: 320,
        height: 40,
        border: "1px solid #1976D2",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: "100%",
          background: "#1976D2",
          color: "white",
        }}
      >
        {header}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: 10,
          width: "calc(100% - 60px)",
        }}
      >
        {content}
      </div>
    </div>
  );
}

export default ChatAppTag;
