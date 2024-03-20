import {h} from "preact"
import "./app.css"
import {Gapless5} from "@regosen/gapless-5"

// @ts-expect-error - cannot find module fountain.ogg
import fountainAudioUrl from "./fountain.ogg"

const backgroundNoisePlayer = new Gapless5({
  tracks: [fountainAudioUrl],
  loop: true,
})

export function App() {
  return (
    <div class="centering-frame">
      <div style={{width: 400, textAlign: "center", padding: "16px"}}>
        <div>
          <button onClick={() => backgroundNoisePlayer.play()}>
            Begin
          </button>
        </div>
      </div>
    </div>
  )
}
