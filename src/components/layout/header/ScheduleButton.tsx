import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function ScheduleButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("schedule");
  };

  return (
    <Button
      sx={{ height: "100%" }}
      variant="contained"
      disableElevation
      onClick={handleClick}
    >
      일정관리
    </Button>
  );
}

export default ScheduleButton;
