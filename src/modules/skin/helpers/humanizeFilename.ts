export const humanizeFilename = (name: string) => {
  return (name.charAt(0).toUpperCase() + name.slice(1)).replace(/\-/g, " ")
}
