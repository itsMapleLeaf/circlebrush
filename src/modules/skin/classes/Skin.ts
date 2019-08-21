import { SkinConfiguration, SkinConfigurationData } from "./SkinConfiguration"
import { promises as fs } from "fs"
import * as path from "path"
import { SkinElementLike } from "../types/SkinElementLike"
import { ImageElement } from "../../imagery/classes/ImageElement"

export interface SkinOptions {
  config: SkinConfiguration
  elements: SkinElementLike[]
}

export interface SerializedSkin {
  config: SkinConfigurationData
  elements: string[]
}

/** Represents a skin */
export class Skin {
  public static async createFromPath(dir: string, temp: string) {
    const files = await fs.readdir(dir)
    const paths = files.map(f => path.join(dir, f))

    const iniName = files.find(x => x === "skin.ini")
    if (!iniName) throw new Error("A skin.ini file was not found")

    const config = await SkinConfiguration.createFromPath(path.join(dir, iniName), temp)
    const elements = await ImageElement.createFromPathList(paths, { temp })

    return new Skin({
      config,
      elements,
    })
  }

  public static async createFromHydration(data: SerializedSkin, temp: string) {
    const config = new SkinConfiguration(data.config)
    const elements = await ImageElement.createFromPathList(data.elements, { temp })

    return new Skin({
      config,
      elements,
    })
  }

  public config: SkinConfiguration
  public elements: SkinElementLike[]

  constructor(options: SkinOptions) {
    const { config, elements } = options

    this.config = config
    this.elements = elements
  }

  public serialize(): SerializedSkin {
    return {
      config: this.config.data,
      elements: this.elements.map(element => element.path),
    }
  }
}
