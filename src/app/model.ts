import {curry} from "@benchristel/taste"
import {DEFAULT_MEDITATION_DURATION_MILLIS} from "./constants"

export type Action = (model: Model) => Model

export type Model = {
  beginButtonDisabled: boolean
  duration: number
}

export const begin: Action = (model: Model) => {
  return {...model, beginButtonDisabled: true}
}

export const setDuration = curry(
  (duration: number, model: Model): Model => ({...model, duration}),
)

export function init(): Model {
  return {
    duration: DEFAULT_MEDITATION_DURATION_MILLIS,
    beginButtonDisabled: false,
  }
}

export function update(model: Model, action: Action): Model {
  return action(model)
}
