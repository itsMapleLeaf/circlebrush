import { BuiltInElement } from "./types/BuiltInElement"
import { getUIBuiltins } from "./helpers/getUIBuiltins"
import { getModBuiltins } from "./helpers/getModBuiltins"

/**
 * Built in skin elements
 */
export const builtInMeta: BuiltInElement[] = [
  ...getUIBuiltins(),
  ...getModBuiltins(),
  {
    name: "approachcircle",
    alias: "approach-circle",
    description: "A hitcircle's approach circle",
  },
]
