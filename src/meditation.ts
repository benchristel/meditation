import {PiecewiseFunction} from "./gp/piecewise-function"

interface ConstructorParams {
  ringBell?: () => unknown
  setBackgroundVolume?: (fraction: number) => unknown
}

export class Meditation {
  private ringBell: () => unknown
  private setBackgroundVolume: (fraction: number) => unknown
  private time = 0
  private volumeFunction: PiecewiseFunction

  constructor(params: ConstructorParams) {
    this.ringBell = params.ringBell ?? noop
    this.setBackgroundVolume = params.setBackgroundVolume ?? noop
    this.volumeFunction = new PiecewiseFunction({
      points: [
        {x: 0, y: 0},
        {x: 10_000, y: 1},
      ],
    })
  }

  begin() {
    this.ringBell()
    this.setBackgroundVolume(0)
  }

  tick(millis: number) {
    this.time += millis
    this.setBackgroundVolume(this.volumeFunction.at(this.time))
  }
}

const noop = () => {}
