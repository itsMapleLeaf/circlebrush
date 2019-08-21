import { extname, basename } from "path"

/** Returns the filename without an extension */
export const getStrippedFilename = (path: string) => {
  const ext = extname(path)
  const name = basename(path, ext)

  return name
}
