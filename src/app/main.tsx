import {h} from "preact"
import {useState} from "preact/hooks"
import {Gapless5} from "@regosen/gapless-5"

// @ts-expect-error - cannot find module fountain.ogg
import fountainAudioUrl from "../assets/fountain.ogg"
// @ts-expect-error - cannot find module bell.ogg
import bellAudioUrl from "../assets/bell.ogg"
import {Meditation} from "../domain/meditation"
import {MeditationProgram} from "../domain/meditation-program"
import {createPiecewiseFunction} from "../gp/piecewise-function"
import {Clock} from "../gp/clock"
import {View} from "./view"

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

export function Main() {
  const [running, setRunning] = useState(false)
  return (
    <View
      running={running}
      onBegin={() => {
        setRunning(true)
        runMeditation()
      }}
    />
  )
}

function runMeditation() {
  const meditation = new Meditation({
    setBackgroundVolume: (v: number) =>
      backgroundNoisePlayer.setVolume(v * backgroundNoiseMaxVolume),
    program: new MeditationProgram({
      backgroundVolume: createPiecewiseFunction({
        points: [
          {x: 0, y: 0},
          {x: 10 * second, y: 1},
          {x: 30 * minute, y: 1},
          {x: 30 * minute + 20 * second, y: 0},
        ],
      }),
    }),
  })

  meditation.begin()
  backgroundNoisePlayer.play()
  bellPlayer.play()

  const clock = new Clock(Date.now)
  setInterval(() => meditation.markTime(clock.tick()), 100)
  setInterval(() => playFromBeginning(bellPlayer), bellIntervalMillis)
}

function playFromBeginning(player: Gapless5) {
  player.stop()
  player.play()
}
