import Calendar from "./Calendar.tsx";
import { useRecoilValue } from "recoil";
import calendarPopUpOpenState from "../../states/schedule/calendarPopUpOpenState.ts";
import CalendarPopUp from "./CalendarPopUp.tsx";

function SchedulePage() {
  const calendarPopUpOpen = useRecoilValue(calendarPopUpOpenState);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Calendar />
      {calendarPopUpOpen ? <CalendarPopUp /> : null}
    </div>
  );
}

export default SchedulePage;
