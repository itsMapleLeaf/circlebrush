import { nameIsAnimation } from "./nameIsAnimation"

describe("nameIsAnimation", () => {
  it("returns true on animations", () => {
    const one = ["sliderb", "sliderb0", "sliderb1", "sliderb2", "sliderb3"]
    const two = ["followpoint-0", "followpoint-1", "followpoint-2", "followpoint-3"]

    expect(nameIsAnimation("sliderb", one)).toBe(true)
    expect(nameIsAnimation("followpoint", two)).toBe(true)
  })

  it("returns false on non-animations", () => {
    const one = ["hit300", "hit0"]
    const two = ["followpoint", "hitcircle"]

    expect(nameIsAnimation("hit300", one)).toBe(false)
    expect(nameIsAnimation("followpoint", two)).toBe(false)
  })
})
