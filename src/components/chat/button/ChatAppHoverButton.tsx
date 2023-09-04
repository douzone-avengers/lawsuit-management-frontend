import { useState } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

type Props = {
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  onClick?: () => void;
};

function ChatAppHoverButton({ Icon, onClick }: Props) {
  const [color, setColor] = useState("gray");
  const [background, setBackground] = useState("white");

  return (
    <div
      style={{
        display: "flex",
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
    </div>
  );
}

export default ChatAppHoverButton;
