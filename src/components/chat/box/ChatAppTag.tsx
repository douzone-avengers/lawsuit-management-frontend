type Props = {
  header: string;
  content: string;
  role: string;
  width?: number | string;
};

function ChatAppTag({ header, content, width, role }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: width ? width : 320,
        height: 40,
        border: role !== "의뢰인" ? "1px solid #1976D2" : "1px solid gray",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: "100%",
          background: role !== "의뢰인" ? "#1976D2" : "gray",
          color: "white",
        }}
      >
        {header}
      </div>
      <div
        style={{
          paddingLeft: 10,
          width: "calc(100% - 60px)",
          overflowX: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {content}
      </div>
    </div>
  );
}

export default ChatAppTag;
