import { Hierarchy } from "../../states/common/IsLoginState";

export type HierarchyData = {
  id: number;
  name: Hierarchy;
};

const hierarchyTable: HierarchyData[] = [
  {
    id: 1,
    name: "NONE",
  },
  {
    id: 2,
    name: "STAFF",
  },
  {
    id: 3,
    name: "ASSISTANT_MANAGER",
  },
  {
    id: 4,
    name: "DEPARTMENT_MANAGER",
  },
  {
    id: 5,
    name: "GENERAL_MANAGER",
  },
  {
    id: 6,
    name: "LAWYER",
  },
  {
    id: 7,
    name: "JUDICIAL_SCRIVENER",
  },
  {
    id: 8,
    name: "PARALEGAL",
  },
];

export default hierarchyTable;
