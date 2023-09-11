import { atom, selector } from "recoil";

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

export const isEmployeeState = selector<boolean>({
  key: "isEmployeeState",
  get: ({ get }) => {
    const user = get(userState);
    if (!user) {
      return false;
    }
    return user.roleId !== 1;
  },
});

export default userState;
