interface ConstructorParams {
  backgroundVolume: NumericFunction
}

interface NumericFunction {
  at(x: number): number
}

export class MeditationProgram {
  backgroundVolume: NumericFunction

  constructor(params: ConstructorParams) {
    this.backgroundVolume = params.backgroundVolume
  }

  volumeAt(time: number): number {
    return this.backgroundVolume.at(time)
  }
}
