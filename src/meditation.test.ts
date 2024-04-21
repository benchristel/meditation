import {Meditation} from "./meditation"

test("a Meditation", {
  "starts by ringing a bell"() {
    let rings = 0
    const meditation = new Meditation({ringBell: () => rings++})

    expect(rings, is, 0)

    meditation.begin()

    expect(rings, is, 1)
  },

  "starts the background noise at a low volume"() {
    let backgroundVolume = 99
    const meditation = new Meditation({
      setBackgroundVolume: (v) => (backgroundVolume = v),
    })

    expect(backgroundVolume, is, 99)

    meditation.begin()

    expect(backgroundVolume, is, 0)
  },

  "gradually ramps up the volume"() {
    let backgroundVolume = 0
    const meditation = new Meditation({
      setBackgroundVolume: (v) => (backgroundVolume = v),
    })

    meditation.begin()
    meditation.tick(1000)

    expect(backgroundVolume, is, 0.1)

    meditation.tick(9000)

    expect(backgroundVolume, is, 1)
  },

  "stays at a volume of 1"() {
    let backgroundVolume = 0
    const meditation = new Meditation({
      setBackgroundVolume: (v) => (backgroundVolume = v),
    })

    meditation.begin()
    meditation.tick(11_000)

    expect(backgroundVolume, is, 1)
  },
})
