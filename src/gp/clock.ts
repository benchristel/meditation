export class Clock {
  private now
  private then: null | number = null
  constructor(now: () => number) {
    this.now = now
  }

  tick() {
    const prevThen = this.then
    this.then = this.now()
    if (prevThen == null) {
      return 0
    }
    return this.now() - prevThen
  }
}
