import { atom } from "recoil";

export type CalendarItemType = {
  year: number;
  month: number;
  date: number;
  dayOfWeek: number;
};

const calendarItemsState = atom<CalendarItemType[]>({
  key: "calendarItemsState",
  default: [],
});

export default calendarItemsState;
