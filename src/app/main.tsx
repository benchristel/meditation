import {h} from "preact"
import {useReducer, useState} from "preact/hooks"
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
import {begin, init, setDuration, update} from "./model"

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
  const [state, dispatch] = useReducer(update, null, init)
  return (
    <View
      inputsDisabled={state.inputsDisabled}
      onBegin={() => {
        dispatch(begin)
        runMeditation(state.duration)
      }}
      durationInputValue={state.duration}
      onDurationInputChanged={(v) => dispatch(setDuration(v))}
    />
  )
}

function runMeditation(duration: number) {
  const meditation = new Meditation({
    ringBell: () => bellPlayer.play(),
    setBackgroundVolume: (v: number) =>
      backgroundNoisePlayer.setVolume(v * backgroundNoiseMaxVolume),
    program: new MeditationProgram({
      backgroundVolume: createPiecewiseFunction({
        points: [
          {x: 0, y: 0},
          {x: 10 * second, y: 1},
          {x: duration, y: 1},
          {x: duration + 20 * second, y: 0},
        ],
      }),
    }),
  })

  meditation.begin()
  backgroundNoisePlayer.play()

  const clock = new Clock(Date.now)
  setInterval(() => meditation.markTime(clock.tick()), 100)
  setInterval(() => playFromBeginning(bellPlayer), bellIntervalMillis)
}

function playFromBeginning(player: Gapless5) {
  player.stop()
  player.play()
}
