
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
