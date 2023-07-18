import { Hierarchy, Role } from "../states/common/UserState";

export function fromHierarchy(hierarchy: Hierarchy): string {
  switch (hierarchy) {
    case "NONE":
      return "의뢰인";
    case "STAFF":
      return "사원";
    case "ASSISTANT_MANAGER":
      return "대리";
    case "DEPARTMENT_MANAGER":
      return "과장";
    case "GENERAL_MANAGER":
      return "부장";
    case "LAWYER":
      return "변호사";
    case "JUDICIAL_SCRIVENER":
      return "법무사";
    case "PARALEGAL":
      return "사무장";
    default:
      return "";
  }
}

export function fromRole(role: Role) {
  switch (role) {
    case "CLIENT":
      return "의뢰인";
    case "EMPLOYEE":
      return "직원";
    case "ADMIN":
      return "관리자";
    default:
      return "";
  }
}
