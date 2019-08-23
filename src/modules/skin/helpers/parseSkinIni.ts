import { ParsedIniBlock, parseIni } from "../../../common/parsing/helpers/parseIni"

const generalMap: Record<string, string> = {
  Name: "name",
  Author: "author",
  Version: "version",
  AnimationFramerate: "framerate",
  AllowSliderBallTint: "tintSliderBall",
  ComboBurstRandom: "randomCombobursts",
  CursorCentre: "centeredCursorHotspot",
  CursorExpand: "expandCursorOnClick",
  CursorRotate: "cursorRotate",
  CursorTrailRotate: "cursorTrailRotate",
}

const flattenGeneral = (block: ParsedIniBlock) => {
  const result: Record<string, any> = {}
  const { values } = block

  for (const [key, alias] of Object.entries(generalMap)) {
    const value = values.get(key)

    if (value) {
      result[alias] = value
    }
  }

  return result
}

/** skin.ini into readable json */
export const parseSkinIni = (data: string) => {
  const blocks = parseIni(data)

  const general = blocks.find(block => block.name === "General")
  if (!general) throw new Error("Missing [General] block")

  return {
    ...flattenGeneral(general),
  }
}
