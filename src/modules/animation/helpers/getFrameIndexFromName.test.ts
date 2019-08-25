import { getFrameIndexFromName } from "./getFrameIndexFromName"

test("getFrameIndexFromName", () => {
  expect(getFrameIndexFromName("sliderb1")).toBe(1)
  expect(getFrameIndexFromName("followpoint-4")).toBe(4)
  expect(getFrameIndexFromName("sliderb0")).toBe(0)
})
