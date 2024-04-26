import {begin, init, update} from "./model"

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
