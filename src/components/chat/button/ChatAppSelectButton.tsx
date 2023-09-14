import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

type Props = {
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  onClick?: () => void;
  selected?: boolean;
};

function ChatAppSelectButton({ Icon, onClick, selected = false }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 96,
        cursor: "pointer",
        background: selected ? "#1976D2" : "white",
      }}
      onClick={onClick}
    >
      <Icon
        sx={{
          color: selected ? "white" : "gray",
        }}
      />
    </div>
  );
}

export default ChatAppSelectButton;
