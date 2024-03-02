export function shortId(prefix: string = "", length: number = 8) {
  return `${prefix}${prefix ? "_" : ""}${Math.random()
    .toString(36)
    .substring(2, length + 2)}`;
}
