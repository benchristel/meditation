import {createPiecewiseFunction} from "./piecewise-function"

test("a PiecewiseFunction", {
  "throws given no points"() {
    const fn = createPiecewiseFunction({points: []})
    expect(() => fn.at(0), throwsError)
  },

  "it returns the y for a point given its x"() {
    const fn = createPiecewiseFunction({
      points: [{x: 42, y: 57}],
    })

    expect(fn.at(42), is, 57)
  },

  "is constant to the left"() {
    const fn = createPiecewiseFunction({
      points: [{x: 42, y: 57}],
    })

    expect(fn.at(0), is, 57)
  },

  "is constant to the right"() {
    const fn = createPiecewiseFunction({
      points: [{x: 42, y: 57}],
    })

    expect(fn.at(100), is, 57)
  },

  "lerps between two points"() {
    const fn = createPiecewiseFunction({
      points: [
        {x: 0, y: 100},
        {x: 1, y: 200},
      ],
    })

    expect(fn.at(0.5), is, 150)
  },

  "lerps between closest points when the point to the right is out of order"() {
    const fn = createPiecewiseFunction({
      points: [
        {x: 0, y: 100},
        {x: 2, y: 99999},
        {x: 1, y: 200},
      ],
    })

    expect(fn.at(0.5), is, 150)
  },

  "lerps between closest points when the point to the left is out of order"() {
    const fn = createPiecewiseFunction({
      points: [
        {x: 0, y: 100},
        {x: 2, y: 400},
        {x: 1, y: 200},
      ],
    })

    expect(fn.at(1.5), is, 300)
  },

  "is constant to the left when points are given out of order"() {
    const fn = createPiecewiseFunction({
      points: [
        {x: 2, y: 99},
        {x: 1, y: 7},
      ],
    })

    expect(fn.at(0), is, 7)
  },

  "is constant to the right when points are given in order"() {
    const fn = createPiecewiseFunction({
      points: [
        {x: 1, y: 7},
        {x: 2, y: 99},
      ],
    })

    expect(fn.at(9), is, 99)
  },
})

function throwsError(f: () => unknown) {
  let caught
  try {
    f()
  } catch (e) {
    caught = e
  }
  return Boolean(caught)
}
