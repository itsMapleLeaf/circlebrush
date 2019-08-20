import { SkinConfiguration, SkinConfigurationData } from "./SkinConfiguration"
import { promises as fs } from "fs"
import * as path from "path"
import { fileSkinImages } from "../helpers/filterSkinImages"
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
  public static async createFromPath(dir: string) {
    const files = await fs.readdir(dir)
    const imagePaths = fileSkinImages(dir, files)

    const iniName = files.find(x => x === "skin.ini")
    if (!iniName) throw new Error("A skin.ini file was not found")

    const config = await SkinConfiguration.createFromPath(path.join(dir, iniName))

    return new Skin({
      config,
      elements: [...imagePaths.map(x => new ImageElement(x))]
    })
  }

  public static createFromHydration(data: SerializedSkin) {
    return new Skin({
      config: new SkinConfiguration(data.config),
      elements: data.elements.map(path => new ImageElement(path))
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
      elements: this.elements.map(element => element.path)
    }
  }
}
