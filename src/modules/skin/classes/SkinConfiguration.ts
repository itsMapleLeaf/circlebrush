import { promises as fs } from "fs"
import { parseSkinIni } from "../helpers/parseSkinIni"
import { observable } from "mobx"

export interface SkinConfigurationData {
  name: string
  version: string
}

/** Represents the skin.ini */
export class SkinConfiguration {
  @observable public data: SkinConfigurationData

  public static async createFromPath(path: string) {
    const data = await fs.readFile(path, "utf8")
    const parsed = parseSkinIni(data)

    return new SkinConfiguration(parsed as any)
  }

  constructor(data: SkinConfigurationData) {
    this.data = data
  }
}
