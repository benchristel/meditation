import {isGreaterThan} from "../gp/predicates"
import {
  DEFAULT_MEDITATION_DURATION_MILLIS,
  MAX_MEDITATION_DURATION_MILLIS,
  MEDITATION_DURATION_STEP_MILLIS,
  MIN_MEDITATION_DURATION_MILLIS,
} from "./constants"

test("meditation duration constants:", {
  "max is greater than min"() {
    expect(
      MAX_MEDITATION_DURATION_MILLIS,
      isGreaterThan,
      MIN_MEDITATION_DURATION_MILLIS,
    )
  },

  "max minus min is greater than step"() {
    const range =
      MAX_MEDITATION_DURATION_MILLIS - MIN_MEDITATION_DURATION_MILLIS
    expect(range, isGreaterThan, MEDITATION_DURATION_STEP_MILLIS)
  },

  "max minus min is a multiple of step"() {
    const range =
      MAX_MEDITATION_DURATION_MILLIS - MIN_MEDITATION_DURATION_MILLIS
    const step = MEDITATION_DURATION_STEP_MILLIS
    expect(range % step, is, 0)
  },

  "default is between min and max"() {
    expect(
      DEFAULT_MEDITATION_DURATION_MILLIS,
      isGreaterThan,
      MIN_MEDITATION_DURATION_MILLIS,
    )
    expect(
      MAX_MEDITATION_DURATION_MILLIS,
      isGreaterThan,
      DEFAULT_MEDITATION_DURATION_MILLIS,
    )
  },

  "default minus min is a multiple of step"() {
    const step = MEDITATION_DURATION_STEP_MILLIS
    const difference =
      DEFAULT_MEDITATION_DURATION_MILLIS -
      MIN_MEDITATION_DURATION_MILLIS
    expect(difference % step, is, 0)
  },
})
