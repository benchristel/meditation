import {h} from "preact"
import {useState} from "preact/hooks"
import "./app.css"
import {Gapless5} from "@regosen/gapless-5"

// @ts-expect-error - cannot find module fountain.ogg
import fountainAudioUrl from "./fountain.ogg"
// @ts-expect-error - cannot find module bell.ogg
import bellAudioUrl from "./bell.ogg"

const second = 1000
const minute = 60 * second

// configuration
const fadeOutMillis = 10 * second
const meditationMillis = 30 * minute
const bellIntervalMillis = 5 * minute

const backgroundNoisePlayer = new Gapless5({
  tracks: [fountainAudioUrl],
  loop: true,
})
backgroundNoisePlayer.setVolume(0.5)

const bellPlayer = new Gapless5({
  tracks: [bellAudioUrl],
})

export function App() {
  const [running, setRunning] = useState(false)
  return (
    <div class="centering-frame">
      <div style={{width: 400, textAlign: "center", padding: "16px"}}>
        <div>
          <button
            disabled={running}
            onClick={() => {
              setRunning(true)
              backgroundNoisePlayer.play()
              bellPlayer.play()
              setInterval(
                () => playFromBeginning(bellPlayer),
                bellIntervalMillis,
              )
              setTimeout(fadeOut, meditationMillis)
            }}
          >
            Begin
          </button>
        </div>
      </div>
    </div>
  )
}

function playFromBeginning(player: Gapless5) {
  player.stop()
  player.play()
}

function fadeOut() {
  let volume = backgroundNoisePlayer.volume
  let volumeIncrement = volume * 0.01
  const interval = setInterval(() => {
    console.log("volume", volume)
    backgroundNoisePlayer.setVolume((volume -= volumeIncrement))
    if (volume <= 0) {
      clearInterval(interval)
    }
  }, fadeOutMillis / 100)
}
