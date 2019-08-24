import { useContext } from "react"
import { ModalItem } from "../components/ModalItem"
import { ensureValue } from "../../../common/lang/ensureValue"

export const useModalContext = () => {
  const context = useContext(ModalItem.context)
  return ensureValue(context)
}
