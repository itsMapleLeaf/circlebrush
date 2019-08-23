import { useInstance } from "../../../../common/electron/hooks/useInstance"
import { useState } from "react"
import { TitlebarButton } from "./TitlebarButton"
import React from "react"
import { useInstanceEvent } from "../../../../common/electron/hooks/useInstanceEvent"

export function MaximizeToggle() {
  const instance = useInstance()
  const [maximized, setMaximized] = useState(instance.isMaximized)

  const toggle = () => {
    if (maximized) {
      instance.restore()
    } else {
      instance.maximize()
    }
  }

  useInstanceEvent("maximize", () => setMaximized(true))
  useInstanceEvent("unmaximize", () => setMaximized(false))

  return <TitlebarButton icon={maximized ? "restore" : "maximize"} onClick={toggle} />
}
