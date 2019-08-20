import { Skin, SerializedSkin } from "../../skin/classes/Skin"
import { observable } from "mobx"

export interface ProjectOptions {
  name: string
  description: string
  skin: Skin
}

export interface SerializedProject {
  name: string
  description: string
  skin: SerializedSkin
}

/** Represents a Circlebrush project */
export class Project {
  @observable public name: string
  @observable public description: string
  @observable public skin: Skin

  public static async createFromSkinFolder(path: string) {
    const skin = await Skin.createFromPath(path)

    return new Project({
      skin,
      name: "Project",
      description: "A Circlebrush project"
    })
  }

  public static createFromHydration(data: SerializedProject) {
    const { name, description } = data
    const skin = Skin.createFromHydration(data.skin)

    return new Project({
      name,
      description,
      skin
    })
  }

  constructor(options: ProjectOptions) {
    const { name, description, skin } = options

    this.name = name
    this.description = description
    this.skin = skin
  }

  public serialize(): SerializedProject {
    const { name, description, skin } = this

    return {
      name,
      description,
      skin: skin.serialize()
    }
  }
}
