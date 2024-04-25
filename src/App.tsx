import {h} from "preact"
import {useState} from "preact/hooks"
import "./app.css"
import {Gapless5} from "@regosen/gapless-5"

// @ts-expect-error - cannot find module fountain.ogg
import fountainAudioUrl from "./fountain.ogg"
// @ts-expect-error - cannot find module bell.ogg
import bellAudioUrl from "./bell.ogg"
import {Meditation} from "./meditation"
import {MeditationProgram} from "./meditation-program"
import {createPiecewiseFunction} from "./gp/piecewise-function"
import {Clock} from "./gp/clock"

const second = 1000
const minute = 60 * second

// configuration
const bellIntervalMillis = 5 * minute
const backgroundNoiseMaxVolume = 0.5

const backgroundNoisePlayer = new Gapless5({
  tracks: [fountainAudioUrl],
  loop: true,
})

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
              runMeditation()
            }}
          >
            Begin
          </button>
        </div>
      </div>
    </div>
  )
}

function runMeditation() {
  const meditation = new Meditation({
    setBackgroundVolume: (v) =>
      backgroundNoisePlayer.setVolume(v * backgroundNoiseMaxVolume),
    program: new MeditationProgram({
      backgroundVolume: createPiecewiseFunction({
        points: [
          {x: 0, y: 0},
          {x: 10_000, y: 1},
          {x: 1800_000, y: 1},
          {x: 1820_000, y: 0},
        ],
      }),
    }),
  })

  meditation.begin()
  backgroundNoisePlayer.play()
  bellPlayer.play()

  const clock = new Clock(Date.now)
  setInterval(() => meditation.tick(clock.tick()), 100)
  setInterval(() => playFromBeginning(bellPlayer), bellIntervalMillis)
}

function playFromBeginning(player: Gapless5) {
  player.stop()
  player.play()
}
