import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  onClick: () => void;
};

function DeleteButton({ onClick }: Props) {
  return (
    <IconButton onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  );
}

export default DeleteButton;
