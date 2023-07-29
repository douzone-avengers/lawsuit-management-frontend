import { atom, selector } from "recoil";
import { Dayjs } from "dayjs";
import caseIdState from "../../CaseIdState.tsx";
import caseReceptionPageState from "./CaseReceptionPageState.tsx";

type CaseReceptionSearchStateType = {
  status: string;
  category: string;
  contents: string;
  startReceivedAt: Dayjs | null;
  endReceivedAt: Dayjs | null;
  startDeadline: Dayjs | null;
  endDeadLine: Dayjs | null;
};

const caseReceptionSearchState = atom<CaseReceptionSearchStateType>({
  key: "caseReceptionSearchState",
  default: {
    status: "all",
    category: "all",
    contents: "",
    startReceivedAt: null,
    endReceivedAt: null,
    startDeadline: null,
    endDeadLine: null,
  },
});

export const caseReceptionSearchUrlState = selector({
  key: "caseReceptionSearchUrlState",
  get: ({ get }) => {
    const caseId = get(caseIdState);
    const page = get(caseReceptionPageState);
    const {
      status,
      category,
      contents,
      startReceivedAt,
      endReceivedAt,
      startDeadline,
      endDeadLine,
    } = get(caseReceptionSearchState);

    let startReceivedAtValue = null;
    if (startReceivedAt) {
      startReceivedAtValue = `${startReceivedAt.year()}-${
        startReceivedAt.month() + 1
      }-${startReceivedAt.date()}`;
    }

    let endReceivedAtValue = null;
    if (endReceivedAt) {
      endReceivedAtValue = `${endReceivedAt.year()}-${
        endReceivedAt.month() + 1
      }-${endReceivedAt.date()}`;
    }

    let startDeadlineValue = null;
    if (startDeadline) {
      startDeadlineValue = `${startDeadline.year()}-${
        startDeadline.month() + 1
      }-${startDeadline.date()}`;
    }

    let endDeadlineValue = null;
    if (endDeadLine) {
      endDeadlineValue = `${endDeadLine.year()}-${
        endDeadLine.month() + 1
      }-${endDeadLine.date()}`;
    }

    return decodeURIComponent(
      `/receptions?lawsuit=${caseId}&page=${page}&status=${status}&category=${category}${
        contents !== "" ? `&contents=${contents}` : ""
      }${
        startReceivedAt !== null
          ? `&start-received-at=${startReceivedAtValue}`
          : ""
      }${
        endReceivedAt !== null ? `&end-received-at=${endReceivedAtValue}` : ""
      }${
        startDeadline !== null ? `&start-deadline=${startDeadlineValue}` : ""
      }${endDeadLine !== null ? `&end-deadline=${endDeadlineValue}` : ""}`,
    );
  },
});

export default caseReceptionSearchState;
