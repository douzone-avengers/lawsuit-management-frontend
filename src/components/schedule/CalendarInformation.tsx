import { CalendarInformationType } from "../../states/schedule/calendarInformationsState.ts";
import { useSetRecoilState } from "recoil";
import calendarPopUpOpenState from "../../states/schedule/calendarPopUpOpenState.ts";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
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
    request("GET", `/schedules/info/${item.receptionId}`, {
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
