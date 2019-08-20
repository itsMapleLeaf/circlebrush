import { BuiltInElement } from "../types/BuiltInElement"

const CATEGORY = "User interface"

const create = (data: Omit<BuiltInElement, "category">): BuiltInElement => ({
  ...data,
  category: CATEGORY
})

export const getUIBuiltins = (): BuiltInElement[] => {
  return [
    /** Menu button */
    create({
      name: "button-left",
      alias: "left-button-fragment",
      description: "The left part of the menu button."
    }),
    create({
      name: "button-middle",
      alias: "middle-button-fragment",
      description: "The middle part of the menu button."
    }),
    create({
      name: "button-right",
      alias: "right-button-fragment",
      description: "The right part of the menu button."
    }),

    /** Cursor */
    create({
      name: "cursor",
      description: "The image used to display the base cursor."
    })
  ]
}
