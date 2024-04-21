import {by} from "./sorting"

test("by", {
  "creates a sort comparator"() {
    const muppets = [
      {name: "Kermit"},
      {name: "Piggy"},
      {name: "Gonzo"},
      {name: "Fozzie"},
      {name: "Scooter"},
    ]

    function name(muppet: {name: string}): string {
      return muppet.name
    }

    expect(muppets.sort(by(name)), equals, [
      {name: "Fozzie"},
      {name: "Gonzo"},
      {name: "Kermit"},
      {name: "Piggy"},
      {name: "Scooter"},
    ])
  },
})
