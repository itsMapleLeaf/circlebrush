import { nameIsFrame } from "./nameIsFrame"
import { filterDownscaled } from "../../imagery/helpers/filterDownscaled"
import { categorize } from "../../../common/lang/array/categorize"
import { getCanonicalFromFrame } from "./getCanonicalFromFrame"
import { getStrippedFilename } from "../../../common/lang/string/getStrippedFilename"
import { isNonNil } from "../../../common/lang/isNonNil"

export const parseFramePaths = async (paths: string[]) => {
  const filteredPaths = paths.filter(filterDownscaled)
  const names = filteredPaths.map(getStrippedFilename)

  const canonicals = names
    .map(name => {
      const canonical = getCanonicalFromFrame(name)
      const isFrame = nameIsFrame(name)

      /**
       * Check if this canonical has a still
       * non animated version
       */
      const still = names.find(staticName => staticName === canonical)

      if (!isFrame)
        return {
          name: canonical,
          still,
        }

      return
    })
    .filter(isNonNil)

  console.log(canonicals)
}
