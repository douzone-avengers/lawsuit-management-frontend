import { Dayjs } from "dayjs";
import { atom, selector } from "recoil";
import caseIdState from "../../CaseIdState.tsx";
import caseExpensePageState from "./CaseExpensePageState.tsx";

type CaseExpenseSearchStateType = {
  contents: string;
  startSpeningAt: Dayjs | null;
  endSpeningAt: Dayjs | null;
  startAmount: number;
  endAmount: number;
};

const caseExpenseSearchState = atom<CaseExpenseSearchStateType>({
  key: "caseExpenseSearchState",
  default: {
    contents: "",
    startSpeningAt: null,
    endSpeningAt: null,
    startAmount: 0,
    endAmount: 0,
  },
});

export const caseExpenseSearchUrlState = selector({
  key: "caseExpenseSearchUrlState",
  get: ({ get }) => {
    const caseId = get(caseIdState);
    const page = get(caseExpensePageState);
    const { contents, startSpeningAt, endSpeningAt, startAmount, endAmount } =
      get(caseExpenseSearchState);

    let startSpeningAtValue = null;
    if (startSpeningAt) {
      startSpeningAtValue = `${startSpeningAt.year()}-${String(
        startSpeningAt.month() + 1,
      ).padStart(2, "0")}-${String(startSpeningAt.date()).padStart(2, "0")}`;
    }

    let endSpeningAtValue = null;
    if (endSpeningAt) {
      endSpeningAtValue = `${endSpeningAt.year()}-${String(
        endSpeningAt.month() + 1,
      ).padStart(2, "0")}-${String(endSpeningAt.date()).padStart(2, "0")}`;
    }

    // /expenses?lawsuit=${caseId}&page=${page}&start-amount=0
    return decodeURIComponent(
      `/expenses?lawsuit=${caseId}&page=${page}${
        contents !== "" ? `&contents=${contents}` : ""
      }${
        startSpeningAt !== null
          ? `&start-spening-at=${startSpeningAtValue}`
          : ""
      }${endSpeningAt !== null ? `&end-spening-at=${endSpeningAtValue}` : ""}${
        startAmount !== null ? `&start-amount=${startAmount}` : 0
      }${endAmount !== null ? `&end-amount=${endAmount}` : 0}`,
    );
  },
});

export default caseExpenseSearchState;
