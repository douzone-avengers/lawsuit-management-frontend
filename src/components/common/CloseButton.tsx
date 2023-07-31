import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

type Props = {
  onClick: () => void;
};

function CloseButton({ onClick }: Props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "right" }}>
      <Box sx={{ cursor: "pointer" }} onClick={onClick}>
        <CloseIcon />
      </Box>
    </Box>
  );
}

export default CloseButton;
