import { observable, computed, toJS } from "mobx"

export type ProgressOptions<T extends string> = {
  message?: string
  sections?: T[]
}

export type ProgressSection = {
  total: number
  progress: number
}

const defaultSections = {
  default: {
    total: 0,
    progress: 0,
  },
}

export class Progress<T extends string = "default"> {
  @observable private _message = "Loading..."

  @observable private selectedSection: T
  @observable private sections: Record<T, ProgressSection> = defaultSections as any

  constructor(options: ProgressOptions<T>) {
    const { message = "Loading...", sections } = options

    this._message = message

    /** God save me from the pain */
    this.sections = sections
      ? (Object.fromEntries(
          sections.map(
            x =>
              [
                x,
                {
                  progress: 0,
                  total: 1,
                },
              ] as const,
          ),
        ) as any)
      : undefined

    this.selectedSection = Object.keys(this.sections)[0] as T
  }

  public setProgress = (progress: number) => {
    this.selected.progress = progress
  }

  public setMessage = (message: string) => {
    this._message = message
  }

  public setTotal = (total: number) => {
    this.selected.total = total
  }

  public nextSection = (section: T) => {
    this.selected.progress = this.selected.total
    this.selectedSection = section
  }

  private get selected() {
    const selected = this.sections[this.selectedSection]
    return selected
  }

  @computed
  public get message() {
    return this._message
  }

  @computed
  public get ratio() {
    const sections = Object.values<ProgressSection>(this.sections)

    const sum = sections.reduce((acc, section) => {
      const { progress, total } = section

      if (total === 0) return acc

      return acc + progress / total
    }, 0)

    return sum / sections.length
  }
}
