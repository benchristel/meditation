import {Clock} from "./clock"

test("a Clock", {
  "returns 0 on the first tick"() {
    let now = 42
    const clock = new Clock(() => now)
    const elapsed = clock.tick()
    expect(elapsed, is, 0)
  },

  "returns the time elapsed between the first and second tick"() {
    let now = 42
    const clock = new Clock(() => now)
    clock.tick()

    now = 50
    const elapsed = clock.tick()

    expect(elapsed, is, 8)
  },

  "returns the time elapsed between the second and third tick"() {
    let now = 42
    const clock = new Clock(() => now)
    clock.tick()

    now = 50
    clock.tick()

    now = 55
    const elapsed = clock.tick()

    expect(elapsed, is, 5)
  },
})
