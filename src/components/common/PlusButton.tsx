import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";

type Props = {
  onClick: () => void;
};

function CheckButton({ onClick }: Props) {
  return (
    <IconButton onClick={onClick}>
      <AddCircleIcon />
    </IconButton>
  );
}

export default CheckButton;
