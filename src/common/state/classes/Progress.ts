import { observable, computed } from "mobx"

export type ProgressOptions = {
  message?: string
  total?: number
}

export class Progress {
  @observable private _message = "Loading..."
  @observable private progress = 0
  @observable private total = 0

  constructor(options: ProgressOptions) {
    const { message = "Loading...", total = 0 } = options

    this._message = message
    this.total = total
  }

  public setProgress = (progress: number) => {
    this.progress = progress
  }

  public setMessage = (message: string) => {
    this._message = message
  }

  public setTotal = (total: number) => {
    this.total = total
  }

  @computed
  public get message() {
    return this._message
  }

  @computed
  public get ratio() {
    if (this.total === 0) return 0
    return this.progress / this.total
  }
}
