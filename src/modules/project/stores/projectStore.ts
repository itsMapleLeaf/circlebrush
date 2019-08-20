import { observable } from "mobx"
import { Project, SerializedProject } from "../classes/Project"
import { Store } from "../../../common/state/types/Store"
import { SkinElementLike } from "../../skin/types/SkinElementLike"

export interface SerializedProjectStore {
  project?: SerializedProject
}
class ProjectStore implements Store<SerializedProjectStore> {
  public init() {}

  @observable project?: Project
  @observable selectedElement?: SkinElementLike

  public async createFromSkinFolder(path: string) {
    const project = await Project.createFromSkinFolder(path)
    this.project = project
  }

  public serialize(): SerializedProjectStore {
    const { project } = this

    return {
      project: project ? project.serialize() : undefined
    }
  }

  public hydrate(data: SerializedProjectStore) {
    if (data.project) {
      this.project = Project.createFromHydration(data.project)
    }
  }
}

export const projectStore = () => new ProjectStore()
