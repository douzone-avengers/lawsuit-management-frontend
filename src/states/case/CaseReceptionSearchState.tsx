import { atom, selector } from "recoil";
import { Dayjs } from "dayjs";
import caseIdState from "./CaseIdState.tsx";
import caseReceptionPageState from "./CaseReceptionPageState.tsx";

type CaseReceptionSearchStateType = {
  status: string;
  category: string;
  start: Dayjs | null;
  end: Dayjs | null;
};

const caseReceptionSearchState = atom<CaseReceptionSearchStateType>({
  key: "caseReceptionSearchState",
  default: {
    status: "all",
    category: "all",
    start: null,
    end: null,
  },
});

export const caseReceptionSearchUrlState = selector({
  key: "caseReceptionSearchUrlState",
  get: ({ get }) => {
    const caseId = get(caseIdState);
    const page = get(caseReceptionPageState);
    const { status, category, start, end } = get(caseReceptionSearchState);

    let startValue = null;
    if (start) {
      startValue = `${start.year()}-${start.month() + 1}-${start.date()}`;
    }

    let endValue = null;
    if (end) {
      endValue = `${end.year()}-${end.month() + 1}-${end.date()}`;
    }

    return `/receptions?lawsuit=${caseId}&page=${page}&status=${status}&category=${category}${
      start !== null ? `&start=${startValue}` : ""
    }${end !== null ? `&end=${endValue}` : ""}`;
  },
});

export default caseReceptionSearchState;
