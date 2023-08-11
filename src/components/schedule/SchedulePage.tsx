import Calendar from "./Calendar.tsx";
import { useRecoilValue } from "recoil";
import calendarPopUpOpenState from "../../states/schedule/calendarPopUpOpenState.ts";
import CalendarPopUp from "./CalendarPopUp.tsx";

function SchedulePage() {
  const calendarPopUpOpen = useRecoilValue(calendarPopUpOpenState);

  return (
    <>
      <Calendar />
      {calendarPopUpOpen ? <CalendarPopUp /> : null}
    </>
  );
}

export default SchedulePage;
