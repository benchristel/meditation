import {h} from "preact"
import Spacer from "../gp/spacer"
import {useRandomId} from "../gp/use-random-id"
import "./style.css"

export interface ViewProps {
  beginButtonDisabled: boolean
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
          <input
            id={durationId}
            type="range"
            min={300_000}
            max={7200_000}
            step={300_000}
            value={1800_000}
          />
        </div>
        <Spacer size="48px" />
        <button
          class="raised"
          disabled={props.beginButtonDisabled}
          onClick={props.onBegin}
        >
          Begin
        </button>
      </div>
    </div>
  )
}
