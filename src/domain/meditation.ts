import {intDiv} from "../gp/math"
import {MeditationProgram} from "./meditation-program"

const bellPeriod = 300_000

interface ConstructorParams {
  ringBell?: () => unknown
  setBackgroundVolume?: (fraction: number) => unknown
  program?: MeditationProgram
}

export class Meditation {
  private ringBell: () => unknown
  private setBackgroundVolume: (fraction: number) => unknown
  private time = 0
  private program: MeditationProgram

  constructor(params: ConstructorParams) {
    this.ringBell = params.ringBell ?? noop
    this.setBackgroundVolume = params.setBackgroundVolume ?? noop
    this.program = params.program ?? defaultProgram
  }

  begin() {
    this.ringBell()
    this.setBackgroundVolume(0)
  }

  markTime(millis: number) {
    const newTime = this.time + millis
    if (
      intDiv(this.time, bellPeriod) !== intDiv(newTime, bellPeriod)
    ) {
      this.ringBell()
    }
    this.time = newTime
    this.setBackgroundVolume(this.program.volumeAt(newTime))
  }
}

const defaultProgram = new MeditationProgram({
  backgroundVolume: () => 0,
})

const noop = () => {}
