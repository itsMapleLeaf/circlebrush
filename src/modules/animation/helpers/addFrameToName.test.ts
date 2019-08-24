import { addFrameToName } from "./addFrameToName"

test("addFrameToName", () => {
  expect(addFrameToName("sliderb", 0)).toBe("sliderb0")
  expect(addFrameToName("followpoint", 0)).toBe("followpoint-0")
})
