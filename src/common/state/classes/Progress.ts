import { observable, computed } from "mobx"

export type ProgressOptions = {
  message?: string
  total?: number
}

export class Progress {
  @observable message = "Loading..."
  @observable private progress = 0
  @observable private total = 0

  constructor(options: ProgressOptions) {
    const { message = "Loading...", total = 0 } = options

    this.message = message
    this.total = total
  }

  public setProgress = (progress: number) => {
    this.progress = progress
  }

  public setTotal = (total: number) => {
    this.total = total
  }

  @computed
  public get ratio() {
    if (this.total === 0) return 0
    return this.progress / this.total
  }
}
