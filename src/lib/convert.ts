import { Hierarchy, Role } from "../states/common/IsLoginState";

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

export function delimiter(num: number): string {
  const numStr = num.toString().split("").reverse().join("");

  let result = "";
  for (let i = 0; i < numStr.length; i++) {
    if (i !== 0 && i % 3 === 0) {
      result += ",";
    }
    result += numStr[i];
  }

  return result.split("").reverse().join("");
}

export function toDateValue(dateStr: string) {
  console.log("dateStr = " + dateStr);
  if (dateStr === null) {
    return "";
  }
  return dateStr.split("T")[0];
}
