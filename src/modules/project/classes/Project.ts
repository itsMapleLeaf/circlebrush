import { observable } from "mobx"
import { join } from "path"
import { SerializedSkin, Skin } from "../../skin/classes/Skin"
import { TEMP_ROOT } from "../constants"
import { ensureTempFolder } from "../helpers/ensureTempFolder"
import { Progress } from "../../../common/state/classes/Progress"
import { ImportSkinFolderProgressSections } from "../actions/importSkinFolder"

export type ProjectData = {
  name: string
  tempName: string
  description: string
  skin: Skin
}

export type SerializedProject = {
  name: string
  tempName: string
  description: string
  skin: SerializedSkin
}

/** Represents a Circlebrush project */
export class Project {
  @observable data: ProjectData

  public static async createFromSkinFolder(
    path: string,
    progress: Progress<ImportSkinFolderProgressSections>,
  ) {
    progress.setMessage("Creating temporary directories...")
    const [tempName, tempPath] = await ensureTempFolder(path)

    const skin = await Skin.createFromPath(path, tempPath, progress)

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
    /**
    const { name, description, tempName } = data

    const tempPath = join(TEMP_ROOT, tempName)
    const skin = await Skin.createFromHydration(data.skin, tempPath)

    return new Project({
      skin,
      name,
      tempName,
      description,
    })
     */
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
