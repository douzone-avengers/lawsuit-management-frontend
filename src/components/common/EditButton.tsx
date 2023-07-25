import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

type Props = {
  onClick: () => void;
};

function EditButton({ onClick }: Props) {
  return (
    <IconButton onClick={onClick}>
      <EditIcon />
    </IconButton>
  );
}

export default EditButton;
