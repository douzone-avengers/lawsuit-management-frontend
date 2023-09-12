import CalendarInformation from "./CalendarInformation.tsx";
import { CalendarItemType } from "../../states/schedule/calendarItemsState.ts";
import { CalendarInformationType } from "../../states/schedule/calendarInformationsState.ts";

export type CalendarCellType = {
  calendar: CalendarItemType;
  informations: CalendarInformationType[];
};

type Props = {
  item: CalendarCellType;
  color?: string;
  background?: string;
};

function CalendarCell({
  item: { calendar, informations },
  color,
  background,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",

        gap: 5,
        height: 100,
        color,
        background,
      }}
    >
      <div style={{ height: 20 }}>
        <span>{calendar.date}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          height: 80,
          gap: 3,
        }}
      >
        {informations.map((item, idx) => (
          <CalendarInformation key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

export default CalendarCell;
