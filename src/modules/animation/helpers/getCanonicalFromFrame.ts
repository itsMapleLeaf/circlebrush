/**
 * Get the canonical element name from a frame name
 * @example
 * "sliderb0" === "sliderb"
 * "followpoint-3" === "followpoint"
 */
export const getCanonicalFromFrame = (name: string) => name.replace(/\-?\d*$/, "")
