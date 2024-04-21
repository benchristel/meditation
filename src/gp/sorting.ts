type Comparator<T> = (a: T, b: T) => number

export function by<T>(
  projection: (item: T) => string | number,
): Comparator<T> {
  return (a, b) => {
    const pa = projection(a)
    const pb = projection(b)

    if (pa > pb) {
      return 1
    } else if (pb > pa) {
      return -1
    } else {
      return 0
    }
  }
}
