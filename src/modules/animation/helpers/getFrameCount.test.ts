import { getFrameCount } from "./getFrameCount"

test("getFrameCount", () => {
  const one = ["sliderb", "sliderb0", "sliderb1", "sliderb2"]

  const two = [
    "followpoint-0",
    "followpoint-1",
    "followpoint-2",
    "followpoint-3",
    "followpoint-4",
    "hit0-0",
    "hit0-1",
  ]

  expect(getFrameCount("sliderb", one)).toBe(3)
  expect(getFrameCount("followpoint", two)).toBe(5)
})
