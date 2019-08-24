import { Store } from "../../../common/state/types/Store"
import { Modal } from "../types/Modal"
import { observable } from "mobx"

class ModalStore implements Store {
  public init() {}

  @observable modals: Modal[] = []

  public spawn(modal: Modal) {
    this.modals.push(modal)

    return () => {
      this.dismiss(modal.name)
    }
  }

  public dismiss(name: string) {
    this.modals = this.modals.filter(modal => modal.name !== name)
  }
}

export const modalStore = () => new ModalStore()
