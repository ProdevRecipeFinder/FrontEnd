export function truncateString(str: string, maxLength: number): string {
  if (str) {
    if (str.length <= maxLength) return str
    return str.slice(0, maxLength) + "..."
  } else 
    return "error"
}
