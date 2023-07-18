export type MemberData = {
  id: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  hierarchyId: number;
  roleId: number;
};

const memberTable: MemberData[] = [
  {
    id: 1,
    email: "root@douzone.com",
    password: "1234",
    name: "김더존",
    phone: "010-0000-0000",
    address: "부산광역시",
    hierarchyId: 2,
    roleId: 2,
  },
];

export default memberTable;
