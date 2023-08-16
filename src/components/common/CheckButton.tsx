import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";

type Props = {
  onClick: () => void;
};

function CheckButton({ onClick }: Props) {
  return (
    <IconButton onClick={onClick}>
      <CheckIcon />
    </IconButton>
  );
}

export default CheckButton;
