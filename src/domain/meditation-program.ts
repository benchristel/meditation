interface ConstructorParams {
  backgroundVolume: (t: number) => number
}

export class MeditationProgram {
  backgroundVolume: (t: number) => number

  constructor(params: ConstructorParams) {
    this.backgroundVolume = params.backgroundVolume
  }

  volumeAt(time: number): number {
    return this.backgroundVolume(time)
  }
}
