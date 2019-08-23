/**
 * Returns true if the given value is not null or undefined.
 * Very useful with array.filter
 */
export const isNonNil = <T>(value: T | undefined | null | void): value is T =>
  value != null
