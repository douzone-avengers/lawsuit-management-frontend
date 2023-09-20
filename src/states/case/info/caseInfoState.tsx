import { atom, selector } from "recoil";
import userState, { isAdminState } from "../../user/UserState.ts";

type PersonInfo = { id: number; name: string; email: string };

type LawsuitType = {
  lawsuitId: number;
  lawsuitNum: string;
  lawsuitName: string;
  lawsuitType: string;
  lawsuitCommissionFee: number;
  lawsuitContingentFee: number;
  lawsuitStatus: string;
  courtName: string;
};

export type CaseInfoType = {
  lawsuit: LawsuitType;
  employees: PersonInfo[];
  clients: PersonInfo[];
};

const caseInfoState = atom<CaseInfoType | null>({
  key: "caseInfoState",
  default: null,
});

export const isClosingCaseState = selector<boolean>({
  key: "isClosingCaseState",
  get: ({ get }) => {
    const caseInfo = get(caseInfoState);
    return caseInfo?.lawsuit.lawsuitStatus === "CLOSING";
  },
});

export const isClosableUserState = selector<boolean>({
  key: "isClosableUser",
  get: ({ get }) => {
    const caseInfo = get(caseInfoState);
    const user = get(userState);
    const isManager = caseInfo?.employees.some(
      (it) => it.email === user?.email,
    ) as boolean;
    const isAdmin = get(isAdminState);
    return isAdmin || isManager;
  },
});

export default caseInfoState;
