import { BuiltInElement } from "../types/BuiltInElement"

const CATEGORY = "Mods"

const create = (name: string, alias = name): BuiltInElement => ({
  name: `selection-mod-${name}`,
  alias: `${alias}-mod`,
  description: `The mod icon for the ${alias} mod.`,
  category: CATEGORY,
})

const mods: (readonly [string, string?])[] = [
  ["autoplay"],
  ["cinema"],
  ["easy"],
  ["relax"],
  ["relax2", "autopilot"],
  ["nofail", "no-fail"],
  ["hardrock", "hard-rock"],
  ["halftime", "half-time"],
  ["doubletime", "double-time"],
  ["nightcore"],
  ["hidden"],
  ["fadein", "fade-in"],
  ["flashlight"],
  ["suddendeath", "sudden-death"],
  ["perfect"],
  ["random"],
  ["spunout", "spun-out"],
  ["target", "target-practice"],
  ["scorev2", "score-v2"],
  ["keycoop", "co-op"],
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => [`key${n}`, `${n}K`] as const),
]

export const getModBuiltins = (): BuiltInElement[] =>
  mods.map(([name, alias]) => create(name, alias))
