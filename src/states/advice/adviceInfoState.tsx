import { atom } from "recoil";

export type IdNameType = { id: number; name: string; selected: boolean };

type AdviceType = {
  id: number;
  title: string;
  contents: string;
  advicedAt: string;
};

export type AdviceInfoType = {
  advice: AdviceType;
  members: IdNameType[];
  clients: IdNameType[];
};

const adviceInfoState = atom<AdviceInfoType | null>({
  key: "adviceInfoState",
  default: null,
});

export default adviceInfoState;
