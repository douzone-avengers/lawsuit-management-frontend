import { atom } from "recoil";

type AdviceType = {
  id: number;
  title: string;
  contents: string;
  advicedAt: string;
  memberId: string[];
  clientId: string[];
};

export type AdviceInfoType = {
  advice: AdviceType;
};

const adviceInfoState = atom<AdviceInfoType | null>({
  key: "adviceInfoState",
  default: null,
});

export default adviceInfoState;
