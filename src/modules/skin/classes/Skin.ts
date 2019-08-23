import { FSWatcher } from "chokidar"
import { copy, readdir } from "fs-extra"
import { join } from "path"
import sanitizeFileName from "sanitize-filename"
import { getStrippedFilename } from "../../../common/lang/string/getStrippedFilename"
import { ImageElement } from "../../imagery/classes/ImageElement"
import { BUILD_FOLDER } from "../../project/constants"
import { createSkinWatcher } from "../helpers/createSkinWatcher"
import { SkinElementLike } from "../types/SkinElementLike"
import { SkinConfiguration, SkinConfigurationData } from "./SkinConfiguration"

export type SkinOptions = {
  config: SkinConfiguration
  elements: SkinElementLike[]
  temp: string
}

export type SerializedSkin = {
  config: SkinConfigurationData
  elements: string[]
}

/** Represents a skin */
export class Skin {
  /**
   * Create a Skin instance from an existing osu! skin folder
   */
  public static async createFromPath(dir: string, temp: string) {
    const files = await readdir(dir)
    const paths = files.map(f => join(dir, f))

    const iniName = files.find(x => x === "skin.ini")
    if (!iniName) throw new Error("A skin.ini file was not found")

    const config = await SkinConfiguration.createFromPath(join(dir, iniName), temp)
    const elements = await ImageElement.createFromPathList(paths, { temp })

    return new Skin({
      config,
      elements,
      temp,
    })
  }

  public static async createFromHydration(data: SerializedSkin, temp: string) {
    const config = new SkinConfiguration(data.config)
    const elements = await ImageElement.createFromPathList(data.elements, { temp })

    return new Skin({
      config,
      elements,
      temp,
    })
  }

  public config: SkinConfiguration
  public elements: SkinElementLike[]

  private watcher?: FSWatcher
  private temp: string

  constructor(options: SkinOptions) {
    const { config, elements, temp } = options

    this.config = config
    this.elements = elements
    this.temp = temp
  }

  /**
   * Watch the asset directory for changes
   * and automatically update the elements in memory
   */
  public watch() {
    if (this.watcher) {
      throw new Error("A watcher already exists!")
    }

    const watcher = (this.watcher = createSkinWatcher(this.temp))

    watcher.on("change", file => {
      const name = getStrippedFilename(file)
      const element = this.getElementByName(name)

      if (element) element.updatePreview()
    })
  }

  public getElementByName(name: string) {
    const element = this.elements.find(element => element.name === name)
    if (element) return element

    return this.elements.find(element => element.alias === name)
  }

  /**
   * Build the skin's final files
   */
  public async build() {
    for (const element of this.elements) {
      await element.build()
    }
  }

  /**
   * Export the skin to a folder
   */
  public async exportToFolder(path: string) {
    const { name } = this.config.data

    await this.build()
    await copy(join(this.temp, BUILD_FOLDER), join(path, sanitizeFileName(name)))
  }

  public serialize(): SerializedSkin {
    return {
      config: this.config.data,
      elements: this.elements.map(element => element.assetPath),
    }
  }
}
