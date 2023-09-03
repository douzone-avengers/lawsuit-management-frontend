import { atom } from "recoil";

export type UserStateType = {
  id: number;
  roleId: number;
  hierarchyId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};

const userState = atom<UserStateType | null>({
  key: "userState",
  default: null,
});

export default userState;
