import * as path from "path"

export const UPSCALED_TO_DOUBLE_IDENTIFIER = "@2x"

export const filterSkinImages = (directory: string, names: string[]) => {
  const result: string[] = []

  for (const name of names) {
    const ext = path.extname(name)
    const baseName = path.basename(name, ext)

    const double = name.includes(UPSCALED_TO_DOUBLE_IDENTIFIER)

    const shouldInclude = double
      ? true
      : !names.find(name => name === `${baseName}${UPSCALED_TO_DOUBLE_IDENTIFIER}${ext}`)

    if (ext === ".png") {
      if (double || shouldInclude) {
        result.push(`${directory.replace(/\\/g, "/")}/${name}`)
      }
    }
  }

  return result
}
