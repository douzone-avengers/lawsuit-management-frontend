import { LawsuitStatus } from "../type/ResponseType.ts";

type Category = "fixed" | "scheduled";

export function delimiter(num: number): string {
  if (num === null) {
    return "-";
  }
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
  if (!dateStr) {
    return "";
  }
  return dateStr.split("T")[0];
}

export function toCategoryName(category: Category) {
  switch (category) {
    case "fixed":
      return "불변";
    case "scheduled":
      return "기일";
    default:
      return category;
  }
}

export function mapLawsuitStatus(status: string) {
  switch (status) {
    case "REGISTRATION":
      return "등록";
    case "PROCEEDING":
      return "진행";
    case "CLOSING":
      return "종결";
    default:
      return status as LawsuitStatus;
  }
}

export function convertHierarchy(id: number) {
  switch (id) {
    case 1:
      return "없음";
    case 2:
      return "사원";
    case 3:
      return "대리";
    case 4:
      return "과장";
    case 5:
      return "부장";
    case 6:
      return "변호사";
    case 7:
      return "법무사";
    case 8:
      return "사무장";
    default:
      return "";
  }
}
