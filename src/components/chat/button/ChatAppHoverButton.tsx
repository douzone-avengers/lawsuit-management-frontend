import { useState } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

type Props = {
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  text?: string;
  onClick?: () => void;
};

function ChatAppHoverButton({ Icon, text, onClick }: Props) {
  const [color, setColor] = useState("gray");
  const [background, setBackground] = useState("white");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: 48,
        width: 48,
        background,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        cursor: "pointer",
      }}
      onClick={onClick}
      onMouseOver={() => {
        setColor("white");
        setBackground("#1976D2");
      }}
      onMouseLeave={() => {
        setColor("gray");
        setBackground("white");
      }}
    >
      <Icon sx={{ color }} />
      <div
        style={{
          color,
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default ChatAppHoverButton;
