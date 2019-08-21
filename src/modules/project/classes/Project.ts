import { Skin, SerializedSkin } from "../../skin/classes/Skin"
import { observable } from "mobx"
import { ensureTempFolder } from "../helpers/ensureTempFolder"
import { join } from "path"
import { TEMP_ROOT } from "../constants"

export interface ProjectData {
  name: string
  tempName: string
  description: string
  skin: Skin
}

export interface SerializedProject {
  name: string
  tempName: string
  description: string
  skin: SerializedSkin
}

/** Represents a Circlebrush project */
export class Project {
  @observable data: ProjectData

  public static async createFromSkinFolder(path: string) {
    const [tempName, tempPath] = await ensureTempFolder(path)
    const skin = await Skin.createFromPath(path, tempPath)

    const { name } = skin.config.data

    skin.watch()

    return new Project({
      skin,
      name,
      tempName,
      description: "A Circlebrush project",
    })
  }

  public static async createFromHydration(data: SerializedProject) {
    const { name, description, tempName } = data

    const tempPath = join(TEMP_ROOT, tempName)
    const skin = await Skin.createFromHydration(data.skin, tempPath)

    return new Project({
      skin,
      name,
      tempName,
      description,
    })
  }

  constructor(data: ProjectData) {
    this.data = data
  }

  public serialize(): SerializedProject {
    const { name, description, skin, tempName } = this.data

    return {
      name,
      tempName,
      description,
      skin: skin.serialize(),
    }
  }

  public get skin() {
    return this.data.skin
  }
}
