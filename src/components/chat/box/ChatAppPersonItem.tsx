import PersonIcon from "@mui/icons-material/Person";
import { CSSProperties } from "react";

type Props = {
  hierarchy: string;
  name: string;
  style?: CSSProperties;
  onClick?: () => void;
};

function ChatAppPersonItem({ hierarchy, name, style, onClick }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
        ...style,
      }}
      onClick={onClick ? onClick : undefined}
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
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: 100,
            height: "100%",
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: 100,
            height: "100%",
          }}
        >
          {hierarchy}
        </div>
      </div>
    </div>
  );
}

export default ChatAppPersonItem;
