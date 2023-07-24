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
  {
    id: 2,
    email: "root2@douzone.com",
    password: "1234",
    name: "김길동",
    phone: "010-0000-0000",
    address: "서울특별시",
    hierarchyId: 2,
    roleId: 2,
  },
  {
    id: 3,
    email: "root3@douzone.com",
    password: "1234",
    name: "김네종",
    phone: "010-0000-0000",
    address: "대구광역시",
    hierarchyId: 2,
    roleId: 3,
  },
];

export default memberTable;
