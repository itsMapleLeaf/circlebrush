import { BuiltInElement } from "./types/BuiltInElement"
import { getUIBuiltins } from "./helpers/getUIBuiltins"

/**
 * Built in skin elements
 */
export const builtInMeta: BuiltInElement[] = [
  ...getUIBuiltins(),
  {
    name: "approachcircle",
    alias: "approach-circle",
    description: "A hitcircle's approach circle"
  }
]
