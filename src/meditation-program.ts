interface ConstructorParams {
  volumeFunction: NumericFunction
}

interface NumericFunction {
  at(x: number): number
}

export class MeditationProgram {
  volumeFunction: NumericFunction

  constructor(params: ConstructorParams) {
    this.volumeFunction = params.volumeFunction
  }

  volumeAt(time: number): number {
    return this.volumeFunction.at(time)
  }
}
