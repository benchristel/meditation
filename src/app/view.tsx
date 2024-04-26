import {h} from "preact"
import "./style.css"

export interface ViewProps {
  running: boolean
  onBegin: () => unknown
}

export function View(props: ViewProps) {
  return (
    <div class="centering-frame">
      <div class="panel">
        <div>
          <button
            class="raised"
            disabled={props.running}
            onClick={props.onBegin}
          >
            Begin
          </button>
        </div>
      </div>
    </div>
  )
}
