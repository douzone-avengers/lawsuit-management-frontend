import { atom } from "recoil";

export type Role = {
  id: number;
  nameKr: string;
  nameEng: string;
};

const roleListState = atom<Role[]>({
  key: "roleListState",
  default: [],
});

export default roleListState;
