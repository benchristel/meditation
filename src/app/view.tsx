import {h} from "preact"
import "./style.css"

export interface ViewProps {
  running: boolean
  onBegin: () => unknown
}

export function View(props: ViewProps) {
  return (
    <div class="centering-frame">
      <div style={{width: 400, textAlign: "center", padding: "16px"}}>
        <div>
          <button disabled={props.running} onClick={props.onBegin}>
            Begin
          </button>
        </div>
      </div>
    </div>
  )
}
