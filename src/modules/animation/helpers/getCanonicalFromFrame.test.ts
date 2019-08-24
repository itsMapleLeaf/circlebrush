import { getCanonicalFromFrame } from "./getCanonicalFromFrame"

test("getCanonicalFromFrame", () => {
  expect(getCanonicalFromFrame("sliderb0")).toBe("sliderb")
  expect(getCanonicalFromFrame("followpoint-1")).toBe("followpoint")
  expect(getCanonicalFromFrame("hit300-1")).toBe("hit300")
})
