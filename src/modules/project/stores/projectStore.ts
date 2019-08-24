import { observable } from "mobx"
import { Store } from "../../../common/state/types/Store"
import { SkinElementLike } from "../../skin/types/SkinElementLike"
import { Project, SerializedProject } from "../classes/Project"
import { Progress } from "../../../common/state/classes/Progress"

export type SerializedProjectStore = {
  project?: SerializedProject
}
class ProjectStore implements Store<SerializedProjectStore> {
  public init() {}

  @observable project?: Project
  @observable selectedElement?: SkinElementLike

  public async createFromSkinFolder(path: string) {
    const progress = new Progress({
      message: "Importing skin folder...",
      total: 0,
    })

    const project = await Project.createFromSkinFolder(path, progress)
    this.project = project
  }

  public serialize(): SerializedProjectStore {
    const { project } = this

    return {
      project: project ? project.serialize() : undefined,
    }
  }

  public async hydrate(data: SerializedProjectStore) {
    if (data.project) {
      // this.project = await Project.createFromHydration(data.project)
    }
  }
}

export const projectStore = () => new ProjectStore()
