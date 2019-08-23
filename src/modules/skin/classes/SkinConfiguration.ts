import { promises as fs } from "fs"
import { copy } from "fs-extra"
import { observable } from "mobx"
import { join } from "path"
import { parseSkinIni } from "../helpers/parseSkinIni"

export type SkinConfigurationData = {
  name: string
  version: string
}

/** Represents the skin.ini */
export class SkinConfiguration {
  @observable public data: SkinConfigurationData

  public static async createFromPath(path: string, temp: string) {
    const data = await fs.readFile(path, "utf8")
    const parsed = parseSkinIni(data)

    await copy(path, join(temp, "skin.ini"))

    return new SkinConfiguration(parsed as any)
  }

  constructor(data: SkinConfigurationData) {
    this.data = data
  }
}
