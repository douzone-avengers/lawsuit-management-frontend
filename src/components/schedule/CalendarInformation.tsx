import { CalendarInformationType } from "../../states/schedule/calendarInformationsState.ts";
import { useSetRecoilState } from "recoil";
import calendarPopUpOpenState from "../../states/schedule/calendarPopUpOpenState.ts";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import calendarPopUpInfoState from "../../states/schedule/calendarPopUpInfoState.ts";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material";

type Props = {
  item: CalendarInformationType;
};

function CalendarInformation({ item }: Props) {
  const setCalendarPopUpOpen = useSetRecoilState(calendarPopUpOpenState);
  const setCalendarPopUpInfo = useSetRecoilState(calendarPopUpInfoState);
  const theme = useTheme();

  const handleSuccess: RequestSuccessHandler = (e) => {
    setCalendarPopUpInfo(e.data);
    setCalendarPopUpOpen(true);
  };

  const handleClick = () => {
    requestDeprecated("GET", `/schedules/${item.receptionId}/info`, {
      onSuccess: handleSuccess,
    });
  };

  const contents = `[${item.lawsuitType}] ${
    item.lawsuitName
  } (${item.employeeNames.join(",")})`;

  return (
    <Chip
      variant="filled"
      sx={{
        width: "100%",
        background: item.receptionStatus
          ? "transparent"
          : theme.palette.primary.main,
        border: item.receptionStatus
          ? `1px solid ${theme.palette.primary.main}`
          : "",
        color: item.receptionStatus ? theme.palette.primary.main : "white",
        textDecoration: item.receptionStatus ? "line-through" : "",
        height: 24,
        minHeight: 24,
      }}
      label={contents}
      onClick={handleClick}
    />
  );
}

export default CalendarInformation;
