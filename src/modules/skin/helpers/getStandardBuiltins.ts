import { BuiltInElement } from "../types/BuiltInElement"

const CATEGORY = "Standard"

const create = (data: Omit<BuiltInElement, "category">): BuiltInElement => ({
  ...data,
  category: CATEGORY,
})

const createCircleGroup = (name: string, alias = name) => [
  create({
    name: `${name}circle`,
    alias: `${alias}-circle-fill`,
    description: `A ${alias} circle's fill. Tinted with the current combo color.`,
  }),
  create({
    name: `${name}circleoverlay`,
    alias: `${alias}-circle-overlay`,
    description: `The overlay displayed on top of a ${alias} circle. Does not get tinted.`,
  }),
]

const createHitburst = (name: string, alias = name) =>
  create({
    name: `hit${name}`,
    alias: `hitburst-${alias}`,
    description: `The hitburst for scoring ${alias}.`,
  })

const hitbursts: [string, string?][] = [
  ["0", "miss"],
  ["50"],
  ["100"],
  ["100k", "100-katu"],
  ["300"],
  ["300k", "300-katu"],
  ["300g", "300-geki"],
]

export const getStandardBultins = (): BuiltInElement[] => {
  return [
    /** Hitcircles & sliders */
    create({
      name: "approachcircle",
      alias: "approach-circle",
      description: "A hitcircle's approach circle",
    }),
    create({
      name: "hitcircleselect",
      alias: "hitcircle-selected",
      description: "Shown on a selected hitcircle in the editor.",
    }),
    create({
      name: "sliderfollowcircle",
      alias: "follow-circle",
      description: "The circle overlayed over the slider ball.",
    }),
    create({
      name: "sliderscorepoint",
      alias: "slider-tick",
      description: "The dots displayed on a slider body.",
    }),
    create({
      name: "reversearrow",
      alias: "slider-reverse-arrow",
      description: "The arrow displayed on a reversed slider.",
    }),
    ...createCircleGroup("hit"),
    ...createCircleGroup("sliderstart", "slider-start"),
    ...createCircleGroup("sliderend", "slider-end"),

    /** Spinner */
    create({
      name: "spinner-approachcircle",
      alias: "spinner-approach-circle",
      description: "A spinner's approach circle.",
    }),
    create({
      name: "spinner-bottom",
      alias: "spinner-bottom-layer",
      description: "The bottom layer of the spinner. Spins slowly.",
    }),
    create({
      name: "spinner-top",
      alias: "spinner-top-layer",
      description: "The middle layer of the spinner. Spins fast.",
    }),
    create({
      name: "spinner-middle",
      alias: "spinner-frame",
      description: "The frame of the spinner. Does not spin, but gets tinted red.",
    }),
    create({
      name: "spinner-middle2",
      alias: "spinner-center",
      description: "The center dot of the spinner. Spins fastest.",
    }),
    create({
      name: "spinner-glow",
      description:
        "Appears behind the spinner. Fades in while tinted blue; flashes white when you collect bonus points",
    }),
    create({
      name: "spinner-spin",
      alias: "spin-warning",
      description: "Appears when the player should start spinning.",
    }),
    create({
      name: "spinner-clear",
      alias: "spinner-cleared",
      description: "Appears when the spinner has been cleared.",
    }),

    /** Hitbursts */
    ...hitbursts.map(([name, alias]) => createHitburst(name, alias)),

    /** Misc */
    create({
      name: "comboburst",
      alias: "standard-comboburst",
      description:
        "Appears on left or right side of the screen when a combo milestone is reached. Flips depending on which side.",
    }),
  ]
}
