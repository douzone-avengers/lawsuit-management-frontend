export type Hierarchy = {
  id: number;
  nameKr: string;
  nameEng: string;
};

export type Role = {
  id: number;
  nameKr: string;
  nameEng: string;
};

export type MemberInfo = {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  hierarchyId: number;
  roleId: number;
};
