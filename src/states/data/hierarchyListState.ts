import { atom } from "recoil";

export type Hierarchy = {
  id: number;
  nameKr: string;
  nameEng: string;
};

const hierarchyListState = atom<Hierarchy[]>({
  key: "hierarchyListState",
  default: [],
});

export default hierarchyListState;
