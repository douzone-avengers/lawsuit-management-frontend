import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import privateButtonIsClickState from "../../../states/private/PrivateButtonIsClickState";

function PrivateButton() {
  const navigate = useNavigate();
  const privateButtonIsClick = useRecoilValue(privateButtonIsClickState);

  const handleClick = () => {
    navigate("private");
  };

  return (
    <Button
      sx={{
        height: "100%",
        background: privateButtonIsClick ? "#1565c0" : "",
      }}
      variant="contained"
      disableElevation
      onClick={handleClick}
    >
      내 정보
    </Button>
  );
}

export default PrivateButton;
