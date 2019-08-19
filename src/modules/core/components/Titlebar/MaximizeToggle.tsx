import { useInstance } from "../../../../common/electron/hooks/useInstance"
import { useState } from "react"
import { TitlebarButton } from "./TitlebarButton"
import React from "react"

export function MaximizeToggle() {
  const instance = useInstance()
  const [maximized, setMaximized] = useState(instance.isMaximized)

  const toggle = () => {
    if (maximized) {
      setMaximized(false)
      instance.restore()
    } else {
      setMaximized(true)
      instance.maximize()
    }
  }

  return (
    <TitlebarButton
      icon={maximized ? "minimize" : "maximize"}
      onClick={toggle}
    />
  )
}
