import CalendarInformation from "./CalendarInformation.tsx";
import { CalendarItemType } from "../../states/schedule/calendarItemsState.ts";
import { CalendarInformationType } from "../../states/schedule/calendarInformationsState.ts";
import { useTheme } from "@mui/material";

export type CalendarCellType = {
  calendar: CalendarItemType;
  informations: CalendarInformationType[];
};

type Props = {
  item: CalendarCellType;
  color?: string;
  background?: string;
};

function isToday(year: number, month: number, date: number): boolean {
  const now = new Date();
  return (
    now.getFullYear() === year &&
    now.getMonth() + 1 === month &&
    now.getDate() === date
  );
}

function CalendarCell({
  item: { calendar, informations },
  color,
  background,
}: Props) {
  const theme = useTheme();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        gap: 5,
        height: 100,
        color,
        background,
      }}
    >
      <div style={{ height: 20 }}>
        <span
          style={{
            borderRadius: isToday(calendar.year, calendar.month, calendar.date)
              ? "50%"
              : 0,
            color: isToday(calendar.year, calendar.month, calendar.date)
              ? "white"
              : "",
            background: isToday(calendar.year, calendar.month, calendar.date)
              ? theme.palette.primary.main
              : "",
          }}
        >
          {calendar.date}
        </span>
      </div>
      <div
        className="custom-scroll"
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
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
