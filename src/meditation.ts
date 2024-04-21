interface ConstructorParams {
  ringBell?: () => unknown
  setBackgroundVolume?: (fraction: number) => unknown
}

export class Meditation {
  private ringBell: () => unknown
  private setBackgroundVolume: (fraction: number) => unknown
  private time = 0

  constructor(params: ConstructorParams) {
    this.ringBell = params.ringBell ?? noop
    this.setBackgroundVolume = params.setBackgroundVolume ?? noop
  }

  begin() {
    this.ringBell()
    this.setBackgroundVolume(0)
  }

  tick(millis: number) {
    this.time += millis
    this.setBackgroundVolume(Math.min(1, this.time / 10_000))
  }
}

const noop = () => {}
