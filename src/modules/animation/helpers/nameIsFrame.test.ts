import { nameIsFrame } from "./nameIsFrame"

describe("nameIsFrame", () => {
  it("handles normal cases", () => {
    expect(nameIsFrame("followpoint-1")).toBe(true)
    expect(nameIsFrame("followpoint")).toBe(false)
  })

  it("handles edgecases", () => {
    expect(nameIsFrame("sliderb0")).toBe(true)
    expect(nameIsFrame("sliderb")).toBe(false)
  })

  it("handles vague names", () => {
    expect(nameIsFrame("hit300")).toBe(false)
    expect(nameIsFrame("hit300-1")).toBe(true)
  })
})
