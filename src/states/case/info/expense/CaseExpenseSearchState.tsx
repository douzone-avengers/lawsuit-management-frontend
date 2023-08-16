import { Dayjs } from "dayjs";
import { atom, selector } from "recoil";
import caseIdState from "../../CaseIdState.tsx";
import caseReceptionPageState from "../reception/CaseReceptionPageState.tsx";

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
    const page = get(caseReceptionPageState);
    const { contents, startSpeningAt, endSpeningAt, startAmount, endAmount } =
      get(caseExpenseSearchState);

    let startSpeningAtValue = null;
    if (startSpeningAt) {
      startSpeningAtValue = `${startSpeningAt.year()}-${
        startSpeningAt.month() + 1
      }-${startSpeningAt.date()}`;
    }

    let endSpeningAtValue = null;
    if (endSpeningAt) {
      endSpeningAtValue = `${endSpeningAt.year()}-${
        endSpeningAt.month() + 1
      }-${endSpeningAt.date()}`;
    }

    return decodeURIComponent(
      `/expense?lawsuit=${caseId}&page=${page}&${
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
