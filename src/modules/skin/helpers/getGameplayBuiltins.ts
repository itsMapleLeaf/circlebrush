import { BuiltInElement } from "../types/BuiltInElement"

const CATEGORY = "Gameplay"

const create = (data: Omit<BuiltInElement, "category">): BuiltInElement => ({
  ...data,
  category: CATEGORY,
})

export const getGameplayBuiltins = (): BuiltInElement[] => {
  return [
    /** Input overlay */
    create({
      name: "inputoverlay-background",
      alias: "input-overlay-background",
      description: "The background for the key input overlay.",
    }),
    create({
      name: "inputoverlay-key",
      alias: "input-overlay-key",
      description: "A key displayed in the key input overlay",
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

    /** Section */
    create({
      name: "section-pass",
      description: "Image dispalyed when you pass a section in a map.",
    }),
    create({
      name: "section-fail",
      description: "Image dispalyed when you fail a section in a map.",
    }),

    /** Pause & Fail */
    create({
      name: "pause-continue",
      alias: "continue-button",
      description: "The continue button displayed in the pause screen.",
    }),
    create({
      name: "pause-retry",
      alias: "retry-button",
      description: "The retry button displayed in the pause & fail screen.",
    }),
    create({
      name: "pause-back",
      alias: "back-to-menu-button",
      description:
        "The button to go back to song select displayed in the pause & fail screen.",
    }),
    create({
      name: "fail-background",
      description: "The background displayed on the fail screen.",
    }),
    create({
      name: "pause-overlay",
      alias: "pause-background",
      description: "The background displayed on the pause screen.",
    }),

    /** Misc */
    create({
      name: "play-unranked",
      alias: "unranked-play-warning",
      description: "The warning displayed at the top when a replay is unranked.",
    }),
    create({
      name: "play-warningarrow",
      alias: "warning-arrow",
      description: "Arrow displayed to warn the user the break is over.",
    }),
    create({
      name: "play-skip",
      alias: "skip-button",
      description: "The skip button before a map starts.",
    }),
    create({
      name: "playfield",
      alias: "play-field-background",
      description: "Background image displayed in the play field.",
    }),
  ]
}
