import { Progress } from "../classes/Progress";

export type ProgressArrayOptions<T> = {
  progress: Progress<any>,
  parallel?: boolean,
  arr: T[],
}

/**
 * Progress an array of items and handle progress automatically
 */
export const progressArray = async <T, R>(fn: (item: T) => Promise<R>, options: ProgressArrayOptions<T>): Promise<R[]> => {
  const { progress, parallel, arr } = options
  progress.setTotal(arr.length)

  let count = 0

  const addCount = () => {
    count += 1
    progress.setProgress(count)
  }

  if (parallel) return Promise.all(arr.map(async (item) => {
    const processed = await fn(item)
    addCount()
    
    return processed
  }))

  const result: R[] = []

  for (const item of arr) {
    const processed = await fn(item)
    addCount()    

    result.push(processed)
  }

  return result
}