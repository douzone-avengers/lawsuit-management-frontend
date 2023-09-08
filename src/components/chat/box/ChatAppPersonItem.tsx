import PersonIcon from "@mui/icons-material/Person";
import { CSSProperties, useState } from "react";

type Props = {
  hierarchy: string;
  name: string;
  style?: CSSProperties;
  hover?: boolean;
  onClick?: () => void;
};

function ChatAppPersonItem({
  hierarchy,
  name,
  style,
  onClick,
  hover = false,
}: Props) {
  const [background, setBackground] = useState("white");

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
        <PersonIcon sx={{ color: "white", width: 32, height: 32 }} />
      </div>
      <div
        style={{
          display: "flex",
          width: 300,
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
            {name}
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
            {hierarchy}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatAppPersonItem;
