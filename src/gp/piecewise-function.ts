import {first, last} from "./arrays"
import {by} from "./sorting"

export interface ConstructorParams {
  points: Point[]
}

export interface Point {
  x: number
  y: number
}

export function createPiecewiseFunction(
  params: ConstructorParams,
): (x: number) => number {
  const piecewiseFunction = new PiecewiseFunction(params)
  return (x) => piecewiseFunction.at(x)
}

class PiecewiseFunction {
  private points: Point[]

  constructor(params: ConstructorParams) {
    this.points = [...params.points].sort(by((p) => p.x))
  }

  at(x: number): number {
    if (this.points.length === 0) {
      throw new Error(
        "Cannot evaluate a piecewise function with no points",
      )
    }

    const prev = last(this.points.filter((p) => p.x <= x))
    const next = first(this.points.filter((p) => p.x > x))

    if (prev == null) {
      return next!.y
    }

    if (next == null) {
      return prev!.y
    }

    return (
      ((next.y - prev.y) * (x - prev.x)) / (next.x - prev.x) + prev.y
    )
  }
}
