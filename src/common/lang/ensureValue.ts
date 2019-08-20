export const ensureValue = <T>(value: T | undefined | null) => {
  if (value === null || value === undefined) {
    throw new Error("Value is undefined!")
  }

  return value
}
