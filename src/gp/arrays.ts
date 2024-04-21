export function last<T>(a: T[]): T | undefined {
  return a[a.length - 1]
}

export function first<T>(a: T[]): T | undefined {
  return a[0]
}
