export type Action = (model: Model) => Model

export type Model = {
  beginButtonDisabled: boolean
}

export const begin: Action = () => {
  return {beginButtonDisabled: true}
}

export function init(): Model {
  return {
    beginButtonDisabled: false,
  }
}

export function update(model: Model, action: Action): Model {
  return action(model)
}
