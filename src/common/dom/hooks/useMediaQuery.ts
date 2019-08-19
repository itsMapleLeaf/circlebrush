import { useState, useEffect } from "react"

export const useMediaQuery = <T extends readonly (string | number)[]>(
  ...breakpoints: T
): boolean[] => {
  const safeBreakpoints = breakpoints.map(x =>
    typeof x === "number" ? `(max-width: ${x}px)` : x
  )

  const queries = safeBreakpoints.map(b => window.matchMedia(b))
  const [results, setResults] = useState<boolean[]>(queries.map(q => q.matches))

  useEffect(() => {
    const handlers = safeBreakpoints.map((_, i) => () => {
      const newResults = [...results]
      const query = queries[i]

      newResults[i] = query.matches
      setResults(newResults)
    })

    for (const [i, query] of queries.entries()) {
      query.addEventListener("change", handlers[i])
    }

    return () => {
      for (const [i, query] of queries.entries()) {
        query.removeEventListener("change", handlers[i])
      }
    }
  }, [results, safeBreakpoints, queries])

  return results
}
