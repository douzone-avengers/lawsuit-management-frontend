import { atom } from "recoil";

type CalendarDateType = {
  year: number;
  month: number;
};

const calendarDateState = atom<CalendarDateType>({
  key: "calendarDateState",
  default: {
    year: 0,
    month: 0,
  },
});

export default calendarDateState;
