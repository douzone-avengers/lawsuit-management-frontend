import { LawsuitStatus } from "../type/ResponseType.ts";

type Category = "fixed" | "scheduled";

export function delimiter(num: number): string {
  console.log(num);
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
