import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import scheduleButtonIsClickState from "../../schedule/ScheduleButtonIsClick.tsx";
import { useRecoilValue } from "recoil";

function ScheduleButton() {
  const navigate = useNavigate();
  const scheduleButtonIsClick = useRecoilValue(scheduleButtonIsClickState);

  const handleClick = () => {
    navigate("schedule");
  };

  return (
    <Button
      sx={{
        height: "100%",
        background: scheduleButtonIsClick ? "#1565c0" : "",
      }}
      variant="contained"
      disableElevation
      onClick={handleClick}
    >
      접수일정
    </Button>
  );
}

export default ScheduleButton;
