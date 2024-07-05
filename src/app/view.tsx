import {h} from "preact"
import Spacer from "../gp/spacer"
import {useRandomId} from "../gp/use-random-id"
import "./style.css"
import {
  MAX_MEDITATION_DURATION_MILLIS,
  MEDITATION_DURATION_STEP_MILLIS,
  MIN_MEDITATION_DURATION_MILLIS,
} from "./constants"

export interface ViewProps {
  inputsDisabled: boolean
  durationInputValue: number
  onDurationInputChanged: (value: number) => unknown
  onBegin: () => unknown
}

export function View(props: ViewProps) {
  const durationId = useRandomId("duration")
  return (
    <div class="centering-frame">
      <div class="panel">
        <h1 style={{fontSize: 14, margin: 0}}>Meditation</h1>
        <Spacer size="16px" />
        <div class="labeled-input">
          <label htmlFor={durationId}>Duration</label>
          <div style={{display: "flex", flexDirection: "column"}}>
            <input
              id={durationId}
              type="range"
              disabled={props.inputsDisabled}
              min={MIN_MEDITATION_DURATION_MILLIS}
              max={MAX_MEDITATION_DURATION_MILLIS}
              step={MEDITATION_DURATION_STEP_MILLIS}
              value={props.durationInputValue}
              onInput={(e) =>
                props.onDurationInputChanged(+e.currentTarget.value)
              }
            />
            <div>{props.durationInputValue / 60_000}m</div>
          </div>
        </div>
        <Spacer size="48px" />
        <button
          autofocus
          class="raised"
          disabled={props.inputsDisabled}
          onClick={props.onBegin}
        >
          Begin
        </button>
      </div>
    </div>
  )
}
