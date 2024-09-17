import {Meditation} from "./meditation"
import {MeditationProgram} from "./meditation-program"

test("a Meditation", {
  "starts by ringing a bell"() {
    let rings = 0
    const meditation = new Meditation({ringBell: () => rings++})

    expect(rings, is, 0)

    meditation.begin()

    expect(rings, is, 1)
  },

  "runs the given background volume program"() {
    let backgroundVolume = 0
    const meditation = new Meditation({
      setBackgroundVolume: (v) => (backgroundVolume = v),
      program: new MeditationProgram({
        backgroundVolume: (time) => time + 7,
      }),
    })

    meditation.begin()
    meditation.markTime(0)

    expect(backgroundVolume, is, 7)

    meditation.markTime(100)

    expect(backgroundVolume, is, 107)
  },

  "rings a second bell at 5 minutes"() {
    let rings = 0
    const meditation = new Meditation({ringBell: () => rings++})

    meditation.begin()
    meditation.markTime(299_000)

    expect(rings, is, 1)

    meditation.markTime(1_000)

    expect(rings, is, 2)
  },

  "rings only one bell at 5 minutes"() {
    let rings = 0
    const meditation = new Meditation({ringBell: () => rings++})

    meditation.begin()
    meditation.markTime(299_000)

    expect(rings, is, 1)

    meditation.markTime(1_000)
    meditation.markTime(1_000)

    expect(rings, is, 2)
  },

  "rings a third bell at 10 minutes"() {
    let rings = 0
    const meditation = new Meditation({ringBell: () => rings++})

    meditation.begin()
    meditation.markTime(599_000)

    expect(rings, is, 2)

    meditation.markTime(1_000)

    expect(rings, is, 3)
  },
})
