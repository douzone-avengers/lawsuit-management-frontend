import { CalendarInformationType } from "../../states/schedule/calendarInformationsState.ts";
import { useSetRecoilState } from "recoil";
import calendarPopUpOpenState from "../../states/schedule/calendarPopUpOpenState.ts";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import calendarPopUpInfoState from "../../states/schedule/calendarPopUpInfoState.ts";

type Props = {
  item: CalendarInformationType;
};

function CalendarInformation({ item }: Props) {
  const setCalendarPopUpOpen = useSetRecoilState(calendarPopUpOpenState);
  const setCalendarPopUpInfo = useSetRecoilState(calendarPopUpInfoState);

  const handleSuccess: RequestSuccessHandler = (e) => {
    setCalendarPopUpInfo(e.data);
    setCalendarPopUpOpen(true);
  };

  const handleClick = () => {
    requestDeprecated("GET", `/schedules/${item.receptionId}/info`, {
      onSuccess: handleSuccess,
      useMock: false,
    });
  };

  const contents = `[${item.lawsuitType}] ${
    item.lawsuitName
  } (${item.employeeNames.join(",")})`;

  return (
    <div
      style={{
        whiteSpace: "nowrap",
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {contents}
    </div>
  );
}

export default CalendarInformation;
