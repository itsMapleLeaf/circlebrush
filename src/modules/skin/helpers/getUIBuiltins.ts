import { BuiltInElement } from "../types/BuiltInElement"

const CATEGORY = "User interface"

const create = (data: Omit<BuiltInElement, "category">): BuiltInElement => ({
  ...data,
  category: CATEGORY,
})

const createSelectionButton = (name: string, alias = name) => [
  create({
    name: `selection-${name}`,
    alias: `${alias}-button`,
    description: `The button for ${alias} on the song select screen.`,
  }),
  create({
    name: `selection-${name}-over`,
    alias: `hovered-${alias}-button`,
    description: `The hover state for the ${alias} button on the song select screen.`,
  }),
]

export const getUIBuiltins = (): BuiltInElement[] => {
  return [
    /** Menu button */
    create({
      name: "button-left",
      alias: "left-button-fragment",
      description: "The left part of the menu button.",
    }),
    create({
      name: "button-middle",
      alias: "middle-button-fragment",
      description: "The middle part of the menu button.",
    }),
    create({
      name: "button-right",
      alias: "right-button-fragment",
      description: "The right part of the menu button.",
    }),

    /** Cursor */
    create({
      name: "cursor",
      description: "The image used to display the base cursor.",
    }),
    create({
      name: "cursortrail",
      alias: "cursor-trail",
      description: "Appears in a trail behind the cursor when you move it.",
    }),
    create({
      name: "cursor-smoke",
      description: "Image used when you draw with the cursor.",
    }),
    create({
      name: "cursormiddle",
      alias: "cursor-middle",
      description:
        "An image displayed in the center on top of the cursor. When this image is present, the trail will be long.",
    }),

    /** Misc */
    create({
      name: "menu-back",
      alias: "back-button",
      description: "The back button displayed in the bottom left.",
    }),
    create({
      name: "menu-button-background",
      alias: "menu-button",
      description:
        "The button image used in the list of beatmaps on the song select screen, and in score lists.",
    }),
    create({
      name: "selection-tab",
      description: "The image used for the filtering tabs on the song select screen.",
    }),
    create({
      name: "menu-background",
      alias: "main-menu-background",
      description:
        "Image displayed as the background on the main menu if the user has supporter.",
    }),

    /** Selection */
    ...createSelectionButton("mode"),
    ...createSelectionButton("mods"),
    ...createSelectionButton("random"),
    ...createSelectionButton("options"),
    ...createSelectionButton("selectoptions", "selection-options"),
  ]
}
