import {MeditationProgram} from "./meditation-program"

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

  tick(millis: number) {
    this.time += millis
    this.setBackgroundVolume(this.program.volumeAt(this.time))
  }
}

const defaultProgram = new MeditationProgram({
  volumeFunction: {at: () => 0},
})

const noop = () => {}
