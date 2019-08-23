import { BuiltInElement } from "./types/BuiltInElement"
import { getUIBuiltins } from "./helpers/getUIBuiltins"
import { getModBuiltins } from "./helpers/getModBuiltins"
import { getGameplayBuiltins } from "./helpers/getGameplayBuiltins"
import { getRankingBuiltins } from "./helpers/getRankingBuiltins"
import { getStandardBultins } from "./helpers/getStandardBuiltins"

/**
 * Built in skin elements
 */
export const builtInMeta: BuiltInElement[] = [
  ...getUIBuiltins(),
  ...getModBuiltins(),
  ...getGameplayBuiltins(),
  ...getRankingBuiltins(),
  ...getStandardBultins(),
]
