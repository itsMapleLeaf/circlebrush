export type ParsedIniBlock = {
  name: string
  values: Map<string, string>
}

export const parseIni = (ini: string) => {
  const lines = ini
    .split(/\n|\r/g)
    .map(line => line.replace(/\/\/.*/, "").trim())
    .filter(Boolean)

  const blocks: ParsedIniBlock[] = []
  let current: ParsedIniBlock | undefined

  for (const line of lines) {
    const section = /^\s*\[(\w+)]\s*$/.exec(line)
    if (section) {
      current = { name: section[1], values: new Map() }
      blocks.push(current)
      continue
    }

    const option = /(\w+):\s*(.*)/.exec(line)

    if (!option) throw Error(`Malformed line: ${line}`)
    if (!current) throw Error("A value started before a section")

    const [, name, value] = option
    current.values.set(name, value)
  }

  return blocks
}
