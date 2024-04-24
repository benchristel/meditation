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
    meditation.tick(0)

    expect(backgroundVolume, is, 7)

    meditation.tick(100)

    expect(backgroundVolume, is, 107)
  },
})
