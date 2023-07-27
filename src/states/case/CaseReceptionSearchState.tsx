import { atom, selector } from "recoil";
import { Dayjs } from "dayjs";
import caseIdState from "./CaseIdState.tsx";
import caseReceptionPageState from "./CaseReceptionPageState.tsx";

type CaseReceptionSearchStateType = {
  status: string;
  category: string;
  startDeadline: Dayjs | null;
  endDeadLine: Dayjs | null;
};

const caseReceptionSearchState = atom<CaseReceptionSearchStateType>({
  key: "caseReceptionSearchState",
  default: {
    status: "all",
    category: "all",
    startDeadline: null,
    endDeadLine: null,
  },
});

export const caseReceptionSearchUrlState = selector({
  key: "caseReceptionSearchUrlState",
  get: ({ get }) => {
    const caseId = get(caseIdState);
    const page = get(caseReceptionPageState);
    const { status, category, startDeadline, endDeadLine } = get(
      caseReceptionSearchState,
    );

    let startValue = null;
    if (startDeadline) {
      startValue = `${startDeadline.year()}-${
        startDeadline.month() + 1
      }-${startDeadline.date()}`;
    }

    let endValue = null;
    if (endDeadLine) {
      endValue = `${endDeadLine.year()}-${
        endDeadLine.month() + 1
      }-${endDeadLine.date()}`;
    }

    return `/receptions?lawsuit=${caseId}&page=${page}&status=${status}&category=${category}${
      startDeadline !== null ? `&start=${startValue}` : ""
    }${endDeadLine !== null ? `&end=${endValue}` : ""}`;
  },
});

export default caseReceptionSearchState;
