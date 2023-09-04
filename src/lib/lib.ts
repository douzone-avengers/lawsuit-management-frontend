export function textEllipsis(text: string, limit: number) {
  return text.length <= limit ? text : `${text.substring(0, limit)}...`;
}
