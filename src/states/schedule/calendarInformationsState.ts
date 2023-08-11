import { atom } from "recoil";

export type CalendarInformationType = {
  receptionId: number;
  deadline: string;
  lawsuitId: number;
  lawsuitType: string;
  lawsuitName: string;
  employeeNames: string[];
};

const calendarInformationsState = atom<CalendarInformationType[]>({
  key: "calendarInformationsState",
  default: [],
});

export default calendarInformationsState;
