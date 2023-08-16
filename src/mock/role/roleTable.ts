import { Role } from "../../states/common/IsLoginState";

export type RoleData = {
  id: number;
  name: Role;
};

const roleTable: RoleData[] = [
  {
    id: 1,
    name: "CLIENT",
  },
  {
    id: 2,
    name: "EMPLOYEE",
  },
  {
    id: 3,
    name: "ADMIN",
  },
];

export default roleTable;
