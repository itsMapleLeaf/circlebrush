import * as path from "path"

export const UPSCALED_TO_DOUBLE_IDENTIFIER = "@2x"

export const fileSkinImages = (directory: string, names: string[]) => {
  const result: string[] = []

  for (const name of names) {
    const ext = path.extname(name)
    const double = name.includes(UPSCALED_TO_DOUBLE_IDENTIFIER)

    if (ext === ".png" && double) {
      result.push(`${directory.replace(/\\/g, "/")}/${name}`)
    }
  }

  return result
}
