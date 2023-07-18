import { atom } from "recoil";

export type Hierarchy =
  | "NONE"
  | "STAFF"
  | "ASSISTANT_MANAGER"
  | "DEPARTMENT_MANAGER"
  | "GENERAL_MANAGER"
  | "LAWYER"
  | "JUDICIAL_SCRIVENER"
  | "PARALEGAL";

export type Role = "CLIENT" | "EMPLOYEE" | "ADMIN";

export type UserState = {
  id: number;
  email: string;
  name: string;
  hierarchy: Hierarchy;
  role: Role;
};

const userState = atom<UserState | null>({
  key: "userState",
  default: {
    id: 1,
    email: "root@douzone.com",
    name: "김더존",
    hierarchy: "STAFF",
    role: "ADMIN",
  },
  // default: null,
});

export default userState;
