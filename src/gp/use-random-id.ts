import {useRef} from "preact/hooks"

export function useRandomId(prefix: string): string {
  const ref = useRef(`${prefix}-${randomInt()}`)
  return ref.current
}

const big = 2 ** 40

function randomInt(): number {
  return Math.floor(Math.random() * big)
}

test("randomInt", {
  "is not 0"() {
    expect(randomInt(), not(is), 0)
  },

  "is big"() {
    let sum = 0
    for (let i = 0; i < 10; i++) {
      sum += randomInt()
    }
    expect(sum, isGreaterThan, 100_000_000_000)
  },
})

function isGreaterThan(reference: number, x: number) {
  return x > reference
}
