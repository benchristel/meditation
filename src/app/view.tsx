import {h} from "preact"
import "./style.css"

export interface ViewProps {
  beginButtonDisabled: boolean
  onBegin: () => unknown
}

export function View(props: ViewProps) {
  return (
    <div class="centering-frame">
      <div class="panel">
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
