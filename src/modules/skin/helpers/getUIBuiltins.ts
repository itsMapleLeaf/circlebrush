import { BuiltInElement } from "../types/BuiltInElement"

const CATEGORY = "User interface"

const create = (data: Omit<BuiltInElement, "category">): BuiltInElement => ({
  ...data,
  category: CATEGORY,
})

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

    /** Health bar */
    create({
      name: "scorebar-bg",
      alias: "healthbar",
      description: "The healthbar background.",
    }),
    create({
      name: "scorebar-colour",
      alias: "healthbar-fill",
      description:
        "The fill inside the healthbar. Gets clipped based on how much health the player has.",
    }),
    create({
      name: "scorebar-marker",
      alias: "Healthbar knob",
      description: "Image positioned at the right end of the clipped fill.",
    }),

    /** Misc */
    create({
      name: "menu-back",
      alias: "back-button",
      description: "The back button displayed in the bottom left.",
    }),
    create({
      name: "menu-button-background",
      alias: "song-button",
      description:
        "The song button image used in the list of beatmaps on the song select screen.",
    }),
  ]
}
