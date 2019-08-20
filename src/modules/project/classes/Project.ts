import { Skin } from "../../skin/classes/Skin"
import { observable } from "mobx"

export interface ProjectOptions {
  name: string
  description: string
  skin: Skin
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

  constructor(options: ProjectOptions) {
    const { name, description, skin } = options

    this.name = name
    this.description = description
    this.skin = skin
  }
}