import { SkinConfiguration, SkinConfigurationData } from "./SkinConfiguration"
import { promises as fs } from "fs"
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
  public static async createFromPath(path: string) {
    const files = await fs.readdir(path)
    const imagePaths = fileSkinImages(path, files)

    /** Temporary */
    //const iniPath = files.find(x => x === "skin.ini")
    const config = new SkinConfiguration({
      name: "Skin",
      version: "latest"
    })

    return new Skin({
      config,
      elements: [...imagePaths.map(x => new ImageElement(x))]
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
