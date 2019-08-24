import { nameIsFrame } from "./nameIsFrame"
import { filterDownscaled } from "../../imagery/helpers/filterDownscaled"
import { categorize } from "../../../common/lang/array/categorize"
import { getCanonicalFromFrame } from "./getCanonicalFromFrame"
import { isNonNil } from "../../../common/lang/isNonNil"
import { getStrippedImageName } from "../../imagery/helpers/getStrippedImageName"
import { nameIsAnimation } from "./nameIsAnimation"

export const parseFramePaths = async (paths: string[]) => {
  const filteredPaths = paths.filter(filterDownscaled)
  const names = filteredPaths.map(getStrippedImageName)

  const canonicals = names
    .map(name => {
      const canonical = getCanonicalFromFrame(name)

      const isFrame = nameIsFrame(name)
      const isAnimation = nameIsAnimation(name, names)

      /**
       * Check if this canonical has a still
       * non animated version
       */
      const still = names.find(staticName => staticName === canonical)

      if (!isFrame && isAnimation) {
        return {
          name: canonical,
          still,
        }
      }

      return
    })
    .filter(isNonNil)

  console.log(canonicals)
}
