import {curry} from "@benchristel/taste"
import {DEFAULT_MEDITATION_DURATION_MILLIS} from "./constants"

export type Action = (model: Model) => Model

export type Model = {
  inputsDisabled: boolean
  duration: number
}

export const begin: Action = (model: Model) => {
  return {...model, inputsDisabled: true}
}

export const setDuration = curry(
  (duration: number, model: Model): Model => ({...model, duration}),
  "setDuration",
)

export function init(): Model {
  return {
    duration: DEFAULT_MEDITATION_DURATION_MILLIS,
    inputsDisabled: false,
  }
}

export function update(model: Model, action: Action): Model {
  return action(model)
}
