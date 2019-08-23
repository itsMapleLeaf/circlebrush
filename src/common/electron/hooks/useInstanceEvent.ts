import { useInstance } from "./useInstance"
import { useEffect } from "react"

export type BrowserWindowEvents = "will-resize" | "maximize" | "unmaximize"

export const useInstanceEvent = (
  type: BrowserWindowEvents,
  callback: (event: any) => void,
) => {
  const instance = useInstance()

  useEffect(() => {
    instance.on(type as any, callback)

    return () => {
      instance.removeListener(type as any, callback)
    }
  })
}
