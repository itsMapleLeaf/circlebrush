import { BuiltInElement } from "../types/BuiltInElement"

const CATEGORY = "Ranking"

const create = (data: Omit<BuiltInElement, "category">): BuiltInElement => ({
  ...data,
  category: CATEGORY,
})

const createRankingLetter = (name: string, alias = name): BuiltInElement[] => [
  create({
    name: `ranking-${name}`,
    alias: `ranking-letter-${alias}`,
    description: `The ranking letter for rank ${alias} displayed on the ranking screen.`,
  }),
  create({
    name: `ranking-${name}-small`,
    alias: `small-ranking-letter-${alias}`,
    description: `The small ranking letter for rank ${alias} displayed in score lists and song selection.`,
  }),
]

const rankings: [string, string?][] = [
  ["A"],
  ["B"],
  ["C"],
  ["D"],
  ["S"],
  ["SH", "S-special"],
  ["X", "SS"],
  ["XH", "SS-special"],
]

export const getRankingBuiltins = (): BuiltInElement[] => {
  return [
    create({
      name: "ranking-panel",
      description: "The ranking panel.",
    }),
    create({
      name: "ranking-graph",
      description: "The graph background displayed under the ranking panel.",
    }),
    create({
      name: "ranking-title",
      alias: "ranking-label",
      description:
        "Label displayed in the top right of the screen on the ranking screen.",
    }),
    create({
      name: "ranking-accuracy",
      alias: "accuracy-label",
      description: "The label displayed above the accuracy on the ranking screen.",
    }),
    create({
      name: "ranking-maxcombo",
      alias: "combo-label",
      description: "The label displayed above the max combo on the ranking screen.",
    }),
    create({
      name: "pause-replay",
      alias: "replay-button",
      description: "The replay button on the ranking screen.",
    }),
    create({
      name: "ranking-perfect",
      alias: "perfect-notice",
      description:
        "The image displayed over the ranking graph when the player got a perfect run.",
    }),
    ...rankings.flatMap(([name, alias]) => createRankingLetter(name, alias)),
  ]
}
