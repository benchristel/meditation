import {begin, init, setDuration, update} from "./model"

test("begin", {
  "disables the begin button"() {
    let state = init()
    expect(state.beginButtonDisabled, is, false)

    state = update(state, begin)

    expect(state.beginButtonDisabled, is, true)
  },

  "does not mutate the previous state"() {
    let state = init()

    update(state, begin)

    expect(state.beginButtonDisabled, is, false)
  },
})

test("setDuration", {
  "sets the duration"() {
    let state = init()
    expect(state.duration, not(is), 42)

    state = update(state, setDuration(42))

    expect(state.duration, is, 42)
  },

  "does not mutate the previous state"() {
    let state = init()
    let unchanged = state.duration

    update(state, setDuration(99))

    expect(state.duration, is, unchanged)
  },
})
