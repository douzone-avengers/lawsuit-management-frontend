import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import scheduleButtonIsClickState from "../../schedule/ScheduleButtonIsClick.tsx";
import { useRecoilValue } from "recoil";

function MyInfoButton() {
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
      내 정보
    </Button>
  );
}

export default MyInfoButton;
