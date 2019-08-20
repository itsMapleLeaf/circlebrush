import { observable } from "mobx"
import { Project } from "../classes/Project"
import { Store } from "../../../common/state/types/Store"

class ProjectStore implements Store {
  public init() {}

  @observable project?: Project

  public async createFromSkinFolder(path: string) {
    const project = await Project.createFromSkinFolder(path)
    this.project = project
  }
}

export const projectStore = () => new ProjectStore()
