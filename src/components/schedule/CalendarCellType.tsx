import CalendarInformation from "./CalendarInformation.tsx";
import { CalendarItemType } from "../../states/schedule/calendarItemsState.ts";
import { CalendarInformationType } from "../../states/schedule/calendarInformationsState.ts";

export type CalendarCellType = {
  calendar: CalendarItemType;
  informations: CalendarInformationType[];
};

type Props = {
  item: CalendarCellType;
};

function CalendarCell({ item: { calendar, informations } }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        height: 60,
      }}
    >
      <div style={{ height: 20 }}>{calendar.date}</div>
      <div
        className="custom-scroll"
        style={{ height: 40, overflowY: "scroll" }}
      >
        {informations.map((item, idx) => (
          <CalendarInformation key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

export default CalendarCell;
